package com.vitorpaulinog.youlyrics.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "Default Error Message Scheme")
public class DefaultErrorResponseDto {
    @Schema(description = "Error code", example = "SOME_ERROR")
    private String code;
    
    @Schema(description = "Descriptive message of the error", example = "Some error has occurred")
    private String message;
    
    @Schema(description = "Date and time the error occurred", example = "2024-08-15T14:30:00Z")
    private LocalDateTime timestamp;

    public DefaultErrorResponseDto() {
        this.timestamp = LocalDateTime.now();
    }
}
