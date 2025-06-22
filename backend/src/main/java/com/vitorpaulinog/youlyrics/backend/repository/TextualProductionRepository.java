package com.vitorpaulinog.youlyrics.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vitorpaulinog.youlyrics.backend.domain.TextualProduction;

@Repository
public interface TextualProductionRepository extends JpaRepository<TextualProduction, UUID> {
    
}
