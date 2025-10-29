package com.vitorpaulinog.youlyrics.backend.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI openAPI() {
        final String securitySchemeName = "googleAuth";
        return new OpenAPI()
            .info(new Info().title("YouLyrics").version("1.0"))
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .type(SecurityScheme.Type.OAUTH2)
                        .description("Autenticação via Google (PKCE)")
                        .flows(new OAuthFlows()
                            .authorizationCode(new OAuthFlow()
                                .authorizationUrl("https://accounts.google.com/o/oauth2/v2/auth")
                                .tokenUrl("https://oauth2.googleapis.com/token")
                                .refreshUrl("https://oauth2.googleapis.com/token")
                                .scopes(new Scopes()
                                    .addString("openid", "OpenID Connect scope")
                                    .addString("email", "Access to email")
                                    .addString("profile", "Access to basic profile")
                                )
                            )
                        )
                )
                .addResponses("ValidationViolation", 
                    new ApiResponse()
                        .description("Input data with validation errors")
                        .content(new Content()
                            .addMediaType("application/json", new MediaType()
                            .schema(new Schema<>().$ref("#/components/schemas/DefaultErrorResponseDto")))
                        )
                )
                
            );
                
    }
}
