package com.vitorpaulinog.youlyrics.backend.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextualProductionCreateRequestDto {
    @NotBlank(message = "Title cannot be blank")
    private String title;
    @NotNull(message = "Content cannot be blank")
    @NotEmpty(message = "Content cannot be empty")
    private List<List<String>> content;
    @NotBlank(message = "LiteraryGenre cannot be blank")
    private String literaryGenre;
}
