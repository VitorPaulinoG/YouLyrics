package com.vitorpaulinog.youlyrics.api.service.impl;



import com.vitorpaulinog.youlyrics.api.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.api.domain.entity.User;
import com.vitorpaulinog.youlyrics.api.dto.mapper.TextualProductionMapper;
import com.vitorpaulinog.youlyrics.api.dto.mapper.TextualProductionMapperImpl;
import com.vitorpaulinog.youlyrics.api.dto.mapper.UserMapperImpl;
import com.vitorpaulinog.youlyrics.api.dto.request.TextualProductionCreateRequestDto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;

import com.vitorpaulinog.youlyrics.api.repository.TextualProductionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {
    TextualProductionServiceImpl.class, 
    TextualProductionMapperImpl.class,  
    UserMapperImpl.class
})
public class TextualProductionServiceImplTest {
    
    @MockitoBean
    private TextualProductionRepository repository;

    @MockitoSpyBean
    private TextualProductionMapper mapper;

    @Autowired
    private TextualProductionServiceImpl service;

    @Captor
    private ArgumentCaptor<TextualProduction> txtProdArgumentCaptor;


    private User user;

    @BeforeEach
    public void setUp() {
        user = User.builder()
            .id(UUID.fromString("5fdaa8d8-6293-4883-bf09-0610c9e8db57"))
            .email("fulano@example.com")
            .name("fulano")
            .build();
    }

    @Nested
    @DisplayName("save()")
    class Save {
        @Test
        @DisplayName("Should save TextualProduction")
        void shouldSaveTextualProduction() {
            var textualProductionDto = TextualProductionCreateRequestDto.builder()
                    .title("Title")
                    .content(List.of(List.of("Content")))
                    .literaryGenre("Literary Genre")
                    .themes(List.of("Romance"))
                    .build();

            var textualProductionMock = TextualProduction.builder()
                    .title("Title")
                    .content(List.of(List.of("Content")))
                    .literaryGenre("Literary Genre")
                    .themes(List.of("Romance"))
                    .build();

            when(repository.save(any())).thenReturn(textualProductionMock);

            var result = service.save(textualProductionDto, user);

            verify(repository).save(txtProdArgumentCaptor.capture());
            verify(mapper).toCreateDto(any());
            assertEquals(txtProdArgumentCaptor.getValue().getAuthor(), user);
            assertNotNull(result);
            assertEquals(textualProductionMock.getId(), result.getId());
        }
    }

    @Nested
    @DisplayName("findAll()")
    class FindAll {
        @Test
        @DisplayName("Should return TextualProductions paginated")
        void shouldReturnTextualProductionsPaginated() {
            Page<TextualProduction> textualProductionsMock = new PageImpl<TextualProduction>(List.of(
                    TextualProduction.builder()
                        .id(UUID.fromString("db6f04ca-cabc-4daf-8a03-ecb3a0c3bf26"))
                        .title("Title01")
                        .content(List.of(List.of("Content")))
                        .literaryGenre("Literary Genre")
                        .themes(List.of("Romance"))
                        .author(user)
                        .build(),
                    TextualProduction.builder()
                        .id(UUID.fromString("1223fccd-ece6-4c8d-b9dc-2aea3b161b7b"))
                        .title("Title02")
                        .content(List.of(List.of("Content")))
                        .literaryGenre("Literary Genre")
                        .themes(List.of("Humor"))
                        .author(user)
                        .build()
            ));
    
            Pageable pageable = PageRequest.of(0, 10);
            when(repository.findAll(any(Pageable.class))).thenReturn(textualProductionsMock);
    
            var result = service.findAll(pageable);
            verify(repository).findAll(pageable);
            verify(mapper, times(2)).toGetDto(any());
            assertNotNull(result);
            assertEquals(2, result.getTotalElements());
            assertNotNull(result.getContent().get(0).getAuthor());
        
        }
    }

}
