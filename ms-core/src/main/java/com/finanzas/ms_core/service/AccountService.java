package com.finanzas.ms_core.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finanzas.ms_core.domain.dto.request.CreateAccountRequest;
import com.finanzas.ms_core.domain.dto.response.AccountResponse;
import com.finanzas.ms_core.domain.model.Account;
import com.finanzas.ms_core.domain.model.User;
import com.finanzas.ms_core.exception.ResourceNotFoundException;
import com.finanzas.ms_core.repository.AccountRepository;
import com.finanzas.ms_core.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public AccountResponse createAccount(CreateAccountRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Usuario no encontrado con ID: " + request.getUserId()));
        Account account = Account.builder()
                .user(user)
                .name(request.getName())
                .currency(request.getCurrency())
                .balance(request.getBalance())
                .bank(request.getBank())
                .type(request.getType())
                .build();
        Account savedAccount = accountRepository.save(account);
        return mapToAccountResponse(savedAccount);
    }

    public List<AccountResponse> listAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream()
                .map(this::mapToAccountResponse).toList();
    }

    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cuenta no encontrada con ID: " + id);
        }
        accountRepository.deleteById(id);
    }

    private AccountResponse mapToAccountResponse(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getUser().getId(),
                account.getName(),
                account.getBank(),
                account.getType(),
                account.getBalance(),
                account.getCurrency());
    }

}
