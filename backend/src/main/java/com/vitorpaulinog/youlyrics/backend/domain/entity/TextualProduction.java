package com.vitorpaulinog.youlyrics.backend.domain.entity;

import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_textual_production")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @NotNull
    private User author;
}
