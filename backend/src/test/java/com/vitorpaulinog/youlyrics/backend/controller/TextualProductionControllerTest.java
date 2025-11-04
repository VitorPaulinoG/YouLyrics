package com.vitorpaulinog.youlyrics.backend.controller;

import com.vitorpaulinog.youlyrics.backend.core.security.OAuth2LoggedUser;
import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.domain.entity.User;
import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;
import com.vitorpaulinog.youlyrics.backend.repository.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("TextualProductionController")
public class TextualProductionControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TextualProductionRepository repository;

    @Autowired
    private UserRepository userRepository;


    private User loggedUser;
    private Map<String, Object> claims;
    private Collection<GrantedAuthority> authorities;
    private Authentication authToken;


    @BeforeEach
    public void setUp() {
        loggedUser = userRepository.save(User.builder()
            .email("fulano@email.com")
            .name("Fulano de Tal")
            .build()
        );

        claims = Map.of();
        authorities = List.of("email", "profile", "openid").stream()
            .map(x -> new SimpleGrantedAuthority(x))
            .collect(Collectors.toList());

        var mockPrincipal = new OAuth2LoggedUser(claims, authorities, loggedUser);
        authToken = new UsernamePasswordAuthenticationToken(
            mockPrincipal,
            null,
            authorities            
        );
    }

    @AfterEach
    public void tearDown() {
        repository.deleteAll();
        userRepository.deleteAll();
    }

    @Nested
    @DisplayName("POST /api/v1/textual-productions")
    class Save {
        @Test
        @DisplayName("Should save a TextualProduction when valid")
        void shouldReturn201Created_whenValid() throws Exception {
            // arrange
            var textualProduction = TextualProductionCreateRequestDto.builder()
                    .title("Title")
                    .content("Content")
                    .literaryGenre("Literary Genre")
                    .build();


            // act && assert
            mockMvc.perform(post("/api/v1/textual-productions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(textualProduction))
                        .with(authentication(authToken)))
                    .andExpect(status().isCreated())
                    .andExpect(header().exists("Location"));
        }

        @Test
        @DisplayName("Should not save a TextualProduction when user is not authenticated")
        void shouldReturn401Unauthorized_whenUserIsNotAuthenticated() throws Exception {
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
                    .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("Should not save a TextualProduction when invalid")
        void shouldReturn400BadRequest_whenInvalid() throws Exception {
            // arrange
            var textualProduction = TextualProductionCreateRequestDto.builder()
                    .title("")
                    .content("Content")
                    .literaryGenre("Literary Genre")
                    .build();

            // act && assert
            mockMvc.perform(post("/api/v1/textual-productions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(textualProduction))
                        .with(authentication(authToken)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
        }
    }
    
    @Nested
    @DisplayName("GET /api/v1/textual-productions")
    class FindAll {
        @Test
        @DisplayName("Should return TextualProductions paginated")
        void shouldReturn200OK_whenTextualProductionsAreFound() throws Exception {
            // arrange
            repository.saveAll(List.of(
                    TextualProduction.builder()
                        .title("Title01")
                        .content("Content01")
                        .literaryGenre("Literary Genre")
                        .author(loggedUser)
                        .build(),
                    TextualProduction.builder()
                        .title("Title02")
                        .content("Content02")
                        .literaryGenre("Literary Genre")
                        .author(loggedUser)
                        .build()
            ));

            // act && assert
            mockMvc.perform(get("/api/v1/textual-productions")
                            .queryParam("page", "0")
                            .queryParam("size", "10")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[1].title", is("Title02")))
                    .andExpect(jsonPath("$.content[1].author", notNullValue()));
        }
    }

}
