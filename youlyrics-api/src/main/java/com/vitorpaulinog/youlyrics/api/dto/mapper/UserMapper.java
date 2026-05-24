package com.vitorpaulinog.youlyrics.api.dto.mapper;

import org.mapstruct.Mapper;

import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.dto.response.UserGetResponseDto;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserGetResponseDto toGetDto(User user);
}
