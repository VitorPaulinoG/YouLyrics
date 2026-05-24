package com.vitorpaulinog.youlyrics.api.controller;

import com.vitorpaulinog.youlyrics.api.core.security.OAuth2LoggedUser;
import com.vitorpaulinog.youlyrics.api.dto.request.TextualProductionCreateRequestDto;
import com.vitorpaulinog.youlyrics.api.dto.response.TextualProductionGetResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import com.vitorpaulinog.youlyrics.api.service.TextualProductionService;
import lombok.RequiredArgsConstructor;
import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/textual-productions")
@RequiredArgsConstructor
@Tag(name = "Textual Production", description = "Textual Production operations")
public class TextualProductionController {

    private final TextualProductionService service;

    @GetMapping
    @Operation(
        summary = "Get Paginated Textual Productions",
        description = "Endpoint to **get** paginated Textual Productions.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Textual Productions successfully obtained"
            )
        }
    )
    public ResponseEntity<Page<TextualProductionGetResponseDto>> findAll(Pageable pageable) {
        var pages = service.findAll(pageable);

        return ResponseEntity.ok(pages);
    }

    @PostMapping
    @Operation(
        summary = "Save Textual Production",
        description = "Endpoint to **save** a new *Textual Production*.",
        responses = {
            @ApiResponse(
                responseCode = "201", description = "Textual Production saved successfully.",
                headers = {
                    @Header(name = "Location", description = "A URI to read this saved Textual Production")
                }
            )
        }
    )
    public ResponseEntity<?> save(
        @Valid @RequestBody TextualProductionCreateRequestDto textualProduction, 
        @AuthenticationPrincipal OAuth2LoggedUser loggedUser
    ) {
        var result = service.save(textualProduction, loggedUser.getUser());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

}
