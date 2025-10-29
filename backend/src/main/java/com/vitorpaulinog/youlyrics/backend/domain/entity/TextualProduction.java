package com.vitorpaulinog.youlyrics.backend.domain.entity;

import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextualProduction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NotBlank(message = "Title cannot be blank")
    @Column(nullable = false)
    private String title;
    @NotBlank(message = "Content cannot be blank")
    @Column(nullable = false)
    private String content;
    @NotBlank(message = "LiteraryGenre cannot be blank")
    @Column(nullable = false)
    private String literaryGenre;
}
