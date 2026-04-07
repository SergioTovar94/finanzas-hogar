package com.finanzas.ms_core.domain.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    @Schema(description = "ID del usuario", example = "1")
    private Long id;

    @Schema(description = "Nombre completo", example = "Ana García")
    private String name;

    @Schema(description = "Correo electrónico", example = "ana@email.com")
    private String email;

    private LocalDateTime createdAt;

}
