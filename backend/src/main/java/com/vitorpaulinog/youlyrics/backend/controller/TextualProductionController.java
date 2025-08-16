package com.vitorpaulinog.youlyrics.backend.controller;

import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RestController;
import com.vitorpaulinog.youlyrics.backend.service.TextualProductionService;
import lombok.RequiredArgsConstructor;
import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/textual-productions")
@RequiredArgsConstructor
@Tag(name = "Textual Production", description = "Textual Production operations")
public class TextualProductionController {

    private final TextualProductionService service;

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
    public ResponseEntity<?> save(@Valid @RequestBody TextualProductionCreateRequestDto textualProduction) {
        var result = service.save(textualProduction);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

}
