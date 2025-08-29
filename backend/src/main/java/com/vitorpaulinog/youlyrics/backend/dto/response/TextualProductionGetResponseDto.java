package com.vitorpaulinog.youlyrics.backend.dto.response;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextualProductionGetResponseDto {
    private UUID id;
    private String title;
    private String content;
    private String literaryGenre;
}
