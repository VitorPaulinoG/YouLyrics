package com.vitorpaulinog.youlyrics.backend.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;

public interface GenericService<T> {
    List<T> getAll();

    T getById(UUID id) throws EntityNotFoundException;

    void save(T entity);

    void update(UUID id, T entity) throws EntityNotFoundException;

    void delete(UUID id);
}
