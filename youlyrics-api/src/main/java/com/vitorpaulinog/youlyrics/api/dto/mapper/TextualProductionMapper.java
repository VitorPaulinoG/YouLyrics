package com.vitorpaulinog.youlyrics.api.dto.mapper;

import com.vitorpaulinog.youlyrics.api.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.api.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionCreateResponseDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionGetResponseDto;
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
