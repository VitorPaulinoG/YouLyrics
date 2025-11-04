package com.vitorpaulinog.youlyrics.backend.dto.mapper;

import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionCreateResponseDto;
import com.vitorpaulinog.youlyrics.backend.dto.response.TextualProductionGetResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TextualProductionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    TextualProduction toEntity(TextualProductionCreateRequestDto textualProductionCreateRequestDto);

    TextualProductionCreateResponseDto toCreateDto(TextualProduction textualProduction);
    TextualProductionGetResponseDto toGetDto(TextualProduction textualProduction);
}
