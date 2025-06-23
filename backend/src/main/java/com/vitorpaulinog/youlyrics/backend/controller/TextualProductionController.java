package com.vitorpaulinog.youlyrics.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.vitorpaulinog.youlyrics.backend.domain.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.service.TextualProductionService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/textual-production")
@RequiredArgsConstructor
public class TextualProductionController {
    private final TextualProductionService textualProductionService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        var textualProductions = textualProductionService.getAll();
        return ResponseEntity.ok(textualProductions);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        var textualProduction = textualProductionService.getById(id);
        return ResponseEntity.ok(textualProduction);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody TextualProduction textualProduction) {
        textualProductionService.save(textualProduction);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody TextualProduction updatedTextualProduction) {
        textualProductionService.update(id, updatedTextualProduction);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        textualProductionService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
