package com.vitorpaulinog.youlyrics.backend.service.impl;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.vitorpaulinog.youlyrics.backend.domain.entity.User;
import com.vitorpaulinog.youlyrics.backend.repository.UserRepository;
import com.vitorpaulinog.youlyrics.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User create(Map<String, Object> userClaims) {
        User user = User.builder()
            .email((String) userClaims.get("email"))
            .name((String) userClaims.get("name")) 
            .build();

        return userRepository.save(user);
    }

}
