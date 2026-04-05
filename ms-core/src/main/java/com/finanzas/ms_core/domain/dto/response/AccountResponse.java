package com.finanzas.ms_core.domain.dto.response;

import java.math.BigDecimal;

import com.finanzas.ms_core.domain.model.AccountType;
import com.finanzas.ms_core.domain.model.Currency;
import com.finanzas.ms_core.domain.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {

    private Long id;

    private Long userId;

    private String name;

    private String bank;

    private AccountType type;

    private BigDecimal balance;

    private Currency currency;

}
