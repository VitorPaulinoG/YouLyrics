package com.vitorpaulinog.youlyrics.backend.dto.mapper;

import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionCreateResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TextualProductionMapper {
    TextualProduction toEntity(TextualProductionCreateRequestDto textualProductionCreateRequestDto);

    TextualProductionCreateResponseDto toDto(TextualProduction textualProduction);
}
