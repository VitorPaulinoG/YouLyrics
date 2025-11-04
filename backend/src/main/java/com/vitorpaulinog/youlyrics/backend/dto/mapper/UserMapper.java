package com.vitorpaulinog.youlyrics.backend.dto.mapper;

import org.mapstruct.Mapper;

import com.vitorpaulinog.youlyrics.backend.domain.entity.User;
import com.vitorpaulinog.youlyrics.backend.dto.response.UserGetResponseDto;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserGetResponseDto toGetDto(User user);
}
