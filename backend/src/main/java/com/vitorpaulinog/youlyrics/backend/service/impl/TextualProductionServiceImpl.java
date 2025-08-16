package com.vitorpaulinog.youlyrics.backend.service.impl;

import com.vitorpaulinog.youlyrics.backend.dto.mapper.TextualProductionMapper;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionCreateResponseDto;
import jakarta.validation.ConstraintViolationException;
import org.springframework.stereotype.Service;

import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;
import com.vitorpaulinog.youlyrics.backend.service.TextualProductionService;

@Service
public class TextualProductionServiceImpl implements TextualProductionService {
    private final TextualProductionRepository repository;
    private final TextualProductionMapper mapper;

    public TextualProductionServiceImpl(
            TextualProductionRepository repository,
            TextualProductionMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public TextualProductionCreateResponseDto save(TextualProductionCreateRequestDto textualProduction)
        throws ConstraintViolationException {
        var savedTextualProduction = this.repository.save(mapper.toEntity(textualProduction));
        return mapper.toDto(savedTextualProduction);
    }

}
