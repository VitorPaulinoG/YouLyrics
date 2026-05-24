package com.vitorpaulinog.youlyrics.api.service.impl;

import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.dto.mapper.TextualProductionMapper;
import com.vitorpaulinog.youlyrics.api.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionCreateResponseDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionGetResponseDto;
import jakarta.validation.ConstraintViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vitorpaulinog.youlyrics.api.repository.TextualProductionRepository;
import com.vitorpaulinog.youlyrics.api.service.TextualProductionService;

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
    public Page<TextualProductionGetResponseDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toGetDto);
    }

    @Override
    public TextualProductionCreateResponseDto save(TextualProductionCreateRequestDto dto, User user)
        throws ConstraintViolationException {
        var textualProduction = mapper.toEntity(dto);
        textualProduction.setAuthor(user);
        
        var savedTextualProduction = this.repository.save(textualProduction);
        return mapper.toCreateDto(savedTextualProduction);
    }

}
