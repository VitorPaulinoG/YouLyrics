package com.vitorpaulinog.youlyrics.api.service;

import java.util.Map;
import java.util.Optional;

import com.vitorpaulinog.youlyrics.api.domain.entity.User;

public interface UserService {
    Optional<User> findByKeycloakId(String keycloakId);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    User create(Map<String, Object> userClaims);
}
