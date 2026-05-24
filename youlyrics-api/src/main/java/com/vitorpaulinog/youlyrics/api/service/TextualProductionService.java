package com.vitorpaulinog.youlyrics.api.service;

import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionCreateResponseDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionGetResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TextualProductionService {
    Page<TextualProductionGetResponseDto> findAll(Pageable pageable);
    TextualProductionCreateResponseDto save(TextualProductionCreateRequestDto dto, User user);
}
