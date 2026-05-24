package com.vitorpaulinog.youlyrics.api.core.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.service.UserService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final Logger LOGGER = LoggerFactory.getLogger(KeycloakJwtAuthenticationConverter.class);
    private final UserService userService;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String keycloakId = jwt.getSubject();
        Map<String, Object> claims = jwt.getClaims();

        User user = userService.findByKeycloakId(keycloakId)
            .orElseGet(() -> {
                LOGGER.info("First login for keycloakId={}. Provisioning user.", keycloakId);
                return userService.create(claims);
            });

        Collection<GrantedAuthority> authorities = extractAuthorities(jwt);
        OAuth2LoggedUser principal = new OAuth2LoggedUser(claims, authorities, user);

        return new UsernamePasswordAuthenticationToken(principal, null, authorities);
    }

    private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        String scope = jwt.getClaimAsString("scope");
        if (scope == null || scope.isBlank()) {
            return Collections.emptyList();
        }
        return java.util.Arrays.stream(scope.split(" "))
                .map(s -> new SimpleGrantedAuthority("SCOPE_" + s))
                .collect(Collectors.toList());
    }
}
