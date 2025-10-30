package com.vitorpaulinog.youlyrics.backend.service;

import java.util.Map;
import java.util.Optional;

import com.vitorpaulinog.youlyrics.backend.domain.entity.User;

public interface UserService {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    void createIfNotExistsByEmail(String email, Map<String, Object> userClaims);
}
