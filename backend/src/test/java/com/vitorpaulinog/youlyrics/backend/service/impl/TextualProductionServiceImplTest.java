package com.vitorpaulinog.youlyrics.backend.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.swing.text.html.parser.Entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitorpaulinog.youlyrics.backend.domain.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
public class TextualProductionServiceImplTest {
    @Mock
    private TextualProductionRepository textualProductionRepository;

    @InjectMocks
    private TextualProductionServiceImpl textualProductionServiceImpl;

    @Test
    void getAll_should_returnAllTextualProductions() {
        // arrange
        List<TextualProduction> mockTextualProductions = List.of(
                TextualProduction.builder()
                        .id(UUID.randomUUID())
                        .title("EXAMPLE 01")
                        .text("TEXT_EXAMPLE")
                        .build(),
                TextualProduction.builder()
                        .id(UUID.randomUUID())
                        .title("EXAMPLE 02")
                        .text("TEXT_EXAMPLE")
                        .build(),
                TextualProduction.builder()
                        .id(UUID.randomUUID())
                        .title("EXAMPLE 03")
                        .text("TEXT_EXAMPLE")
                        .build());

        when(textualProductionRepository.findAll()).thenReturn(mockTextualProductions);

        // act
        var result = textualProductionServiceImpl.getAll();

        // assert
        verify(textualProductionRepository).findAll();
        assertEquals(result, mockTextualProductions);
    }

    @Test
    void getById_should_returnTextualProduction_when_idExists() {
        // arrange
        UUID mockId = UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454");
        Optional<TextualProduction> mockTextualProduction = Optional.of(TextualProduction.builder()
                .id(mockId)
                .title("EXAMPLE 01")
                .text("TEXT_EXAMPLE")
                .build());

        when(textualProductionRepository.findById(mockId))
                .thenReturn(mockTextualProduction);

        // act
        var result = textualProductionServiceImpl.getById(mockId);

        // assert
        verify(textualProductionRepository).findById(any());
        assertNotNull(result);
        assertEquals(result, mockTextualProduction);
    }

    @Test
    void getById_should_throwsEntityNotFoundException_when_idNotExists() {
        // arrange
        UUID mockId = UUID.fromString("a8c2de3d-1fea-4d2c-a2b0-10f63c4c3454");

        when(textualProductionRepository.findById(mockId))
                .thenReturn(Optional.ofNullable(null));

        // act && assert
        assertThatThrownBy(() -> textualProductionServiceImpl.getById(mockId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Textual Production not found!");

        verify(textualProductionRepository).findById(any());
    }

    @Test
    void save_should_saveTextualProduction() {
        TextualProduction textualProduction = TextualProduction.builder()
                .title("EXAMPLE 01")
                .text("TEXT_EXAMPLE")
                .build();

        textualProductionServiceImpl.save(textualProduction);

        verify(textualProductionRepository).save(textualProduction);
    }

    @Test
    void update_should_updateTextualProduction_when_idExists() {
        UUID mockId = UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454");
        Optional<TextualProduction> mockTextualProduction = Optional.of(TextualProduction.builder()
                .id(mockId)
                .title("EXAMPLE 01")
                .text("TEXT_EXAMPLE")
                .build());

        TextualProduction updatedTextualProduction = TextualProduction.builder()
                .id(mockId)
                .title("EXAMPLE 02")
                .text("OTHER TEXT")
                .build();

        when(textualProductionRepository.findById(mockId))
                .thenReturn(mockTextualProduction);

        textualProductionServiceImpl.update(mockId, updatedTextualProduction);

        verify(textualProductionRepository).findById(any());
        verify(textualProductionRepository).save(updatedTextualProduction);
    }

    @Test
    void update_should_throwsEntityNotFoundException_when_idNotExists() {
        UUID mockId = UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454");
        TextualProduction updatedTextualProduction = TextualProduction.builder()
                .id(mockId)
                .title("EXAMPLE 02")
                .text("OTHER TEXT")
                .build();

        when(textualProductionRepository.findById(mockId))
                .thenReturn(Optional.ofNullable(null));

        assertThatThrownBy(() -> textualProductionServiceImpl.update(mockId, updatedTextualProduction))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Textual Production not found!");

        verify(textualProductionRepository).findById(mockId);
        verify(textualProductionRepository, never()).save(any());

    }

    @Test
    void delete_should_deleteTextualProduction() {
        UUID mockId = UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454");

        textualProductionServiceImpl.delete(mockId);

        verify(textualProductionRepository).deleteById(mockId);
    }
}
