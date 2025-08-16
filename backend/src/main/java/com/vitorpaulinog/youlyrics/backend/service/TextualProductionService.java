package com.vitorpaulinog.youlyrics.backend.service;

import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionCreateResponseDto;

public interface TextualProductionService {
    TextualProductionCreateResponseDto save(TextualProductionCreateRequestDto entity);
}
