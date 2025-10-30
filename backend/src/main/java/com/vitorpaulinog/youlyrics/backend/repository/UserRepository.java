package com.vitorpaulinog.youlyrics.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vitorpaulinog.youlyrics.backend.domain.entity.User;


public interface UserRepository extends JpaRepository<User, UUID>{
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
