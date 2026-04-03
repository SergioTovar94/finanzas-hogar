package com.finanzas.ms_core.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finanzas.ms_core.domain.dto.request.LoginRequest;
import com.finanzas.ms_core.domain.dto.request.RegisterRequest;
import com.finanzas.ms_core.domain.dto.response.AuthResponse;
import com.finanzas.ms_core.domain.dto.response.UserResponse;
import com.finanzas.ms_core.domain.model.User;
import com.finanzas.ms_core.exception.AuthException;
import com.finanzas.ms_core.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse createUser(RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password_hash(request.getPassword())
                .build();
        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);

    }

    public List<UserResponse> listUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Usuario no encontrado"));

        if (!user.getPassword_hash().equals(request.getPassword())) {
            throw new AuthException("Contraseña incorrecta");
        }
        AuthResponse response = AuthResponse.builder()
                .token("fake-jwt-token")
                .user(mapToUserResponse(user))
                .build();
        return response;
    }

    public UserResponse mapToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreated_at());
    }

}
