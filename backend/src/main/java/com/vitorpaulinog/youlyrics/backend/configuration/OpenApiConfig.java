package com.vitorpaulinog.youlyrics.backend.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .components(new Components()
                .addResponses("ValidationViolation",
                    new ApiResponse()
                        .description("Input data with validation errors")
                        .content(new Content()
                                .addMediaType("application/json",
                                        new MediaType().schema(new Schema<>()
                                                .$ref("#/components/schemas/DefaultErrorResponseDto")))))
            );

    }
}
