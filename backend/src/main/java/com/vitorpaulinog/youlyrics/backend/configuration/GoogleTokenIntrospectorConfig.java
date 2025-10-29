package com.vitorpaulinog.youlyrics.backend.configuration;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Configuration
public class GoogleTokenIntrospectorConfig {

    @Value("${spring.security.oauth2.resourceserver.opaque-token.introspection-uri}")
    private String introspectionUri;

    @Bean
    OpaqueTokenIntrospector introspector(RestTemplateBuilder restTemplateBuilder) {
        
        RestTemplate restTemplate = restTemplateBuilder.build();

        return (token) -> {
            
            String uri = UriComponentsBuilder.fromUriString(introspectionUri)
                    .queryParam("access_token", token)
                    .toUriString();

            
            
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> rawClaims = restTemplate.getForObject(uri, Map.class);
                Map<String, Object> claims = new java.util.HashMap<>(rawClaims);
                
                if (claims.containsKey("exp")) {
                    long expSeconds = Long.parseLong(claims.get("exp").toString());
                    claims.put("exp", Instant.ofEpochSecond(expSeconds));
                }

                if (claims.containsKey("iat")) {
                    long iatSeconds = Long.parseLong(claims.get("iat").toString());
                    claims.put("iat", Instant.ofEpochSecond(iatSeconds));
                }


                Collection<GrantedAuthority> authorities = new ArrayList<>();
                if (claims.containsKey("scope")) {
                    String scope = (String) claims.get("scope");
                    authorities = Arrays.stream(scope.split(" "))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                }

                return new DefaultOAuth2AuthenticatedPrincipal(claims.get("sub").toString(), claims, authorities);

            } catch (HttpClientErrorException e) {
                throw new OAuth2AuthenticationException(
                    new OAuth2Error("invalid_token", "Token inválido: " + e.getMessage(), null), e
                );
            }
        };
    }
}
