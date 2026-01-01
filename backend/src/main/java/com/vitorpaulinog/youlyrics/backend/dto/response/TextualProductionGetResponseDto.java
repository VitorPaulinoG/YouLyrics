package com.vitorpaulinog.youlyrics.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextualProductionGetResponseDto {
    private UUID id;
    private String title;
    private List<List<String>> content;
    private String literaryGenre;
    private String description;
    private UserGetResponseDto author;
}
