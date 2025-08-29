package com.vitorpaulinog.youlyrics.backend.controller;

import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TextualProductionControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TextualProductionRepository repository;

    @AfterEach
    public void tearDown() {
        repository.deleteAll();
    }

    @Test
    void save_should_return201WithLocationHeader_when_TextualProductionIsSuccessfullySaved() throws Exception {
        // arrange
        var textualProduction = TextualProductionCreateRequestDto.builder()
                .title("Title")
                .content("Content")
                .literaryGenre("Literary Genre")
                .build();

        // act && assert
        mockMvc.perform(post("/api/v1/textual-productions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(textualProduction)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    void save_should_return400_when_validationsAreViolated() throws Exception {
        // arrange
        var textualProduction = TextualProductionCreateRequestDto.builder()
                .title("")
                .content("Content")
                .literaryGenre("Literary Genre")
                .build();

        // act && assert
        mockMvc.perform(post("/api/v1/textual-productions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(textualProduction)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
    }

    @Test
    void findAll_should_return200_when_TextualProductionsIsSuccessfullyFound() throws Exception {
        // arrange
        repository.saveAll(List.of(
                TextualProduction.builder()
                    .title("Title01")
                    .content("Content01")
                    .literaryGenre("Literary Genre")
                    .build(),
                TextualProduction.builder()
                    .title("Title02")
                    .content("Content02")
                    .literaryGenre("Literary Genre")
                    .build()
        ));


        // act && assert
        mockMvc.perform(get("/api/v1/textual-productions")
                        .queryParam("page", "0")
                        .queryParam("size", "10")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[1].title", is("Title02")));
    }

}
