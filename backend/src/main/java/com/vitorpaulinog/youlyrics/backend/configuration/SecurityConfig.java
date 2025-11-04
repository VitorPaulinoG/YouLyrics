package com.vitorpaulinog.youlyrics.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .cors(cors -> cors.disable())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers(
                    "/swagger-ui/**", 
                        "/swagger-ui.html", 
                        "/swagger-resources/**",
                        "/swagger-ui/oauth2-redirect.html",
                        "/swagger-resources",
                        "/v3/api-docs/**",
                        "/actuator/**",
                        "/webjars/**"
                    ).permitAll()
                    .anyRequest().permitAll();
            })
            .oauth2ResourceServer(oauth2 -> {
                oauth2.opaqueToken(Customizer.withDefaults());
            })
            .build();
    }
}
