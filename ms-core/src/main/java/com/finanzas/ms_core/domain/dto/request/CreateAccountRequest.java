package com.finanzas.ms_core.domain.dto.request;

import java.math.BigDecimal;

import com.finanzas.ms_core.domain.model.AccountType;
import com.finanzas.ms_core.domain.model.Currency;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountRequest {

    @NotNull(message = "El usuario (userId) es obligatorio")
    private long userId;

    @NotBlank(message = "El nombre de la cuenta (name) es obligatorio")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String name;

    @NotBlank(message = "El nombre del banco (bank) es obligatorio")
    @Size(max = 50, message = "El nombre del banco no puede tener más de 50 caracteres")
    private String bank;

    @NotNull(message = "El tipo de cuenta (type) es obligatorio")
    private AccountType type;

    @NotNull(message = "El monto (balance) es obligatorio")
    @PositiveOrZero(message = "El monto debe ser un valor positivo o cero")
    @Digits(integer = 12, fraction = 2)
    private BigDecimal balance;

    @NotNull(message = "La moneda (currency) es obligatoria")
    private Currency currency;

}
