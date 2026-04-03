package com.finanzas.ms_core.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzas.ms_core.domain.dto.request.LoginRequest;
import com.finanzas.ms_core.domain.dto.request.RegisterRequest;
import com.finanzas.ms_core.domain.dto.response.AuthResponse;
import com.finanzas.ms_core.domain.dto.response.UserResponse;
import com.finanzas.ms_core.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse createUser(@Valid @RequestBody RegisterRequest request) {
        return userService.createUser(request);
    }

    @GetMapping()
    public List<UserResponse> listUsers() {
        return userService.listUsers();
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }

}
