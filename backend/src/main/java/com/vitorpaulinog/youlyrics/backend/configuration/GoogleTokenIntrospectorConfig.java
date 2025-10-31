package com.vitorpaulinog.youlyrics.backend.configuration;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.vitorpaulinog.youlyrics.backend.core.security.OAuth2LoggedUser;
import com.vitorpaulinog.youlyrics.backend.domain.entity.User;
import com.vitorpaulinog.youlyrics.backend.service.UserService;

@Configuration
public class GoogleTokenIntrospectorConfig {
    
    @Value("${spring.security.oauth2.authorizationserver.endpoint.oidc.user-info-uri}")
    private String userinfoEndpoint;

    private RestTemplate restTemplate;

    private OAuth2ResourceServerProperties resourceServerProps;

    private final UserService userService;

    public GoogleTokenIntrospectorConfig(
        OAuth2ResourceServerProperties resourceServerProps,
        RestTemplateBuilder restTemplateBuilder,
        UserService userService
    ) {
        this.restTemplate = restTemplateBuilder.build();
        this.resourceServerProps = resourceServerProps;
        this.userService = userService;
    }
    
    @Bean
    OpaqueTokenIntrospector introspector() {
        return (token) -> {
            try {
                var claims = getClaims(token);
                
                Collection<GrantedAuthority> authorities = new ArrayList<>();
                if (claims.containsKey("scope")) {
                    String scope = (String) claims.get("scope");
                    authorities = Arrays.stream(scope.split(" "))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                }

                var user = getUser(token, (String) claims.get("email"));
                return new OAuth2LoggedUser(claims, authorities, user);

            } catch (HttpClientErrorException e) {
                throw new OAuth2AuthenticationException(
                    new OAuth2Error("invalid_token", "Token inválido: " + e.getMessage(), null), e
                );
            }
        };
    }

    private Map<String, Object> getClaims(String token) {
        String introspectionEndpoint = UriComponentsBuilder.fromUriString(
                resourceServerProps.getOpaquetoken()
                    .getIntrospectionUri()
            )
            .queryParam("access_token", token)
            .toUriString();

        @SuppressWarnings("unchecked")
        Map<String, Object> claims = new HashMap<>(restTemplate.getForObject(introspectionEndpoint, Map.class));

        if (claims.containsKey("exp")) {
            long expSeconds = Long.parseLong((String) claims.get("exp"));
            claims.put("exp", Instant.ofEpochSecond(expSeconds));
        }

        if (claims.containsKey("iat")) {
            long iatSeconds = Long.parseLong((String) claims.get("iat"));
            claims.put("iat", Instant.ofEpochSecond(iatSeconds));
        }

        return claims;
    }

    private User getUser(String token, String email) {
        var registeredUser = userService.findByEmail(email);
        if (registeredUser.isPresent()) {
            return registeredUser.get();
        }
        
        String userinfoURL = UriComponentsBuilder.fromUriString(
            userinfoEndpoint
        ).toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Void> userinfoRequestEntity = new HttpEntity<>(headers);
        
        var response = restTemplate.exchange(userinfoURL, HttpMethod.GET, userinfoRequestEntity,Map.class);
        
        @SuppressWarnings("unchecked")
        Map<String, Object> userClaims = new HashMap<String, Object>(response.getBody());
        
        return userService.create(userClaims);
    }
    
}
