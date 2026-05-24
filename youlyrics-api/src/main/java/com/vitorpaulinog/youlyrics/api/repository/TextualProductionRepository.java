package com.vitorpaulinog.youlyrics.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vitorpaulinog.youlyrics.api.domain.entity.TextualProduction;

@Repository
public interface TextualProductionRepository extends JpaRepository<TextualProduction, UUID> {
    
}
