package com.vitorpaulinog.youlyrics.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.vitorpaulinog.youlyrics.backend.domain.TextualProduction;
import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;
import com.vitorpaulinog.youlyrics.backend.service.TextualProductionService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TextualProductionServiceImpl implements TextualProductionService {
    private final TextualProductionRepository textualProductionRepository;

    public TextualProductionServiceImpl(TextualProductionRepository textualProductionRepository) {
        this.textualProductionRepository = textualProductionRepository;
    }

    @Override
    public List<TextualProduction> getAll() {
        return this.textualProductionRepository.findAll();
    }

    @Override
    public TextualProduction getById(UUID id) throws EntityNotFoundException {
        var result = this.textualProductionRepository.findById(id);
        if (!result.isPresent())
            throw new EntityNotFoundException("Textual Production not found!");

        return result.get();
    }

    @Override
    public void save(TextualProduction textualProduction) {
        this.textualProductionRepository.save(textualProduction);
    }

    @Override
    public void update(UUID id, TextualProduction textualProduction) throws EntityNotFoundException {
        var currentTextualProduction = getById(id);

        currentTextualProduction.setTitle(textualProduction.getTitle());
        currentTextualProduction.setText(textualProduction.getText());

        this.textualProductionRepository.save(currentTextualProduction);
    }

    @Override
    public void delete(UUID id) {
        this.textualProductionRepository.deleteById(id);
    }
}
