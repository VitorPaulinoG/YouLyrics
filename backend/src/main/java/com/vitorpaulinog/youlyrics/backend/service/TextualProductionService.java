package com.vitorpaulinog.youlyrics.backend.service;

import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionCreateResponseDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionGetResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TextualProductionService {
    Page<TextualProductionGetResponseDto> findAll(Pageable pageable);
    TextualProductionCreateResponseDto save(TextualProductionCreateRequestDto entity);
}
