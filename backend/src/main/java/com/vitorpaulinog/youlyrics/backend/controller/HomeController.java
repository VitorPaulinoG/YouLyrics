package com.vitorpaulinog.youlyrics.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("")
public class HomeController {

    @GetMapping("/health-check")
    @Operation(
        summary = "Check the health of this API",
        description = "Endpoint to **check** the YouLyrics API"
    )
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Hello, world!");
    }

}
