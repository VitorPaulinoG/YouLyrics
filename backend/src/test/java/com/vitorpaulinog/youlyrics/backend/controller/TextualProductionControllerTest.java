package com.vitorpaulinog.youlyrics.backend.controller;

import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vitorpaulinog.youlyrics.backend.domain.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.service.TextualProductionService;
import com.vitorpaulinog.youlyrics.backend.service.impl.TextualProductionServiceImpl;

@WebMvcTest(TextualProductionController.class)
public class TextualProductionControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TextualProductionService textualProductionService;
    
    @Test
    void getById_should_returnOK_when_idExists() throws Exception {
        // arrange
        var textualProductionMock = TextualProduction.builder()
            .id(UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
            .title("EXAMPLE 01")
            .text("TEXT EXAMPLE")
            .build();
        
        when(textualProductionService.getById(any())).thenReturn(textualProductionMock);
        
        // act && assert
        mockMvc.perform(get("/api/v1/textual-production/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
            .andExpect(jsonPath("$.title").value(textualProductionMock.getTitle()))
            .andExpect(jsonPath("$.text").value(textualProductionMock.getText()));
    }

    // criar caso de exceção


    @Test
    void getAll_should_returnOK() throws Exception {
        // arrange
        var textualProductionMockList = List.of(
            TextualProduction.builder()
                .id(UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
                .title("EXAMPLE 01")
                .text("TEXT EXAMPLE")
                .build(),
            TextualProduction.builder()
                .id(UUID.fromString("a8a3ac3d-1cbf-4d7a-a8a0-29a63c4c3454"))
                .title("EXAMPLE 02")
                .text("TEXT EXAMPLE")
                .build(),
            TextualProduction.builder()
                .id(UUID.fromString("C2c2de2d-2fea-2d2c-a2b2-22f23c2c3252"))
                .title("EXAMPLE 03")
                .text("TEXT EXAMPLE")
                .build()
        );


        when(textualProductionService.getAll()).thenReturn(textualProductionMockList);
        
        // act && assert
        mockMvc.perform(get("/api/v1/textual-production"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$", hasSize(3)))
            .andExpect(jsonPath("$[0].id").value("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
            .andExpect(jsonPath("$[0].title").value("EXAMPLE 01"))
            .andExpect(jsonPath("$[0].text").value("TEXT EXAMPLE"));
    }

    @Test
    void save_should_returnCreated() throws JsonProcessingException, Exception {
        // arrange
        var textualProduction = TextualProduction.builder()
                .id(UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
                .title("EXAMPLE 01")
                .text("TEXT EXAMPLE")
                .build();
        
        // act && assert
        mockMvc.perform(post("/api/v1/textual-production")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(textualProduction)))
                .andExpect(status().isCreated());
    }

    @Test
    void update_should_returnNoContent() throws JsonProcessingException, Exception {
        // arrange
        var textualProduction = TextualProduction.builder()
                .id(UUID.fromString("f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
                .title("FIRST EXAMPLE")
                .text("TEXT EXAMPLE")
                .build();

        // act && assert
        mockMvc.perform(put("/api/v1/textual-production/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(textualProduction)))
                .andExpect(status().isNoContent());
    }

    @Test
    void delete_should_returnNoContent() throws Exception {
        // act && assert
        mockMvc.perform(delete("/api/v1/textual-production/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454"))
                .andExpect(status().isNoContent());
    }
}
