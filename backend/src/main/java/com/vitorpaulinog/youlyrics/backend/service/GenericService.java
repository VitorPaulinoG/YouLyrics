package com.vitorpaulinog.youlyrics.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericService<T> {
    List<T> getAll();
    Optional<T> getById(UUID id);
    void save(T entity);
    void update(UUID id, T entity);
    void delete(UUID id);
}
