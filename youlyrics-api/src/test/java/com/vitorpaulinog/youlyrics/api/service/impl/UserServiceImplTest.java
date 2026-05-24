package com.vitorpaulinog.youlyrics.api.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock 
    private UserRepository repository;
    
    @InjectMocks
    private UserServiceImpl service;

    @Test
    void create_should_saveUser() {
        Map<String, Object> claims = Map.of(
            "email", "fulano@email.com",
            "name", "Fulano",
            "family_name", "de Tal"
        );

        User userMock = User.builder()
            .email("fulano@email.com")
            .name("Fulano")
            .build();

        when(repository.save(any())).thenReturn(userMock);

        var result = service.create(claims);

        verify(repository).save(any());
        assertEquals(userMock, result);
    }


    @Test
    void findByEmail_should_returnUser_whenEmailExists() {
        String email = "fulano@email.com";

        User userMock = User.builder()
            .email("fulano@email.com")
            .name("Fulano")
            .build();

        when(repository.findByEmail(anyString())).thenReturn(Optional.of(userMock));

        var result = service.findByEmail(email);

        verify(repository).findByEmail(anyString());
        assertEquals(userMock, result);
    }
}
