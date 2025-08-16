package com.vitorpaulinog.youlyrics.backend.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.dto.mapper.TextualProductionMapper;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;

@ExtendWith(MockitoExtension.class)
public class TextualProductionServiceImplTest {
    @Mock
    private TextualProductionRepository repository;

    @Spy
    private TextualProductionMapper mapper = Mappers.getMapper(TextualProductionMapper.class);


    @InjectMocks
    private TextualProductionServiceImpl service;

    @Test
    void save_should_saveTextualProductionAndReturnDto() {
        var textualProduction = TextualProductionCreateRequestDto.builder()
                .title("Title")
                .content("Content")
                .literaryGenre("Literary Genre")
                .build();

        var textualProductionMock = TextualProduction.builder()
                .title("Title")
                .content("Content")
                .literaryGenre("Literary Genre")
                .build();

        when(repository.save(any())).thenReturn(textualProductionMock);

        var result = service.save(textualProduction);

        verify(repository).save(any());
        verify(mapper).toDto(any());

        assertNotNull(result);
        assertEquals(textualProductionMock.getId(), result.getId());
    }
}
