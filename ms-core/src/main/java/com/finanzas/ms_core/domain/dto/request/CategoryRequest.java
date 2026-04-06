package com.finanzas.ms_core.domain.dto.request;

import com.finanzas.ms_core.domain.model.TransactionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {

    @NotBlank(message = "El nombre de la categoría (name) es obligatorio")
    private String name;

    @NotNull(message = "El tipo de transacción (type) es obligatorio")
    private TransactionType type;

}
