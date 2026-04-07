package com.finanzas.ms_core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.finanzas.ms_core.domain.dto.request.TransactionRequest;
import com.finanzas.ms_core.domain.dto.response.TransactionResponse;
import com.finanzas.ms_core.domain.model.Account;
import com.finanzas.ms_core.domain.model.Category;
import com.finanzas.ms_core.domain.model.Transaction;
import com.finanzas.ms_core.exception.ResourceNotFoundException;
import com.finanzas.ms_core.repository.AccountRepository;
import com.finanzas.ms_core.repository.CategoryRepository;
import com.finanzas.ms_core.repository.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
public class TransactionService {

        private final TransactionRepository transactionRepository;
        private final AccountRepository accountRepository;
        private final CategoryRepository categoryRepository;

        public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository,
                        CategoryRepository categoryRepository) {
                this.transactionRepository = transactionRepository;
                this.accountRepository = accountRepository;
                this.categoryRepository = categoryRepository;
        }

        @Transactional
        public TransactionResponse createTransaction(TransactionRequest request) {
                Account originAccount = accountRepository.findById(request.getOriginAccountId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Cuenta no encontrada con ID: " + request.getOriginAccountId()));
                Category category = categoryRepository.findById(request.getCategoryId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Categoría no encontrada con ID: " + request.getCategoryId()));
                Transaction transaction = Transaction.builder()
                                .originAccount(originAccount)
                                .amount(request.getAmount())
                                .description(request.getDescription())
                                .date(request.getDate())
                                .category(category)
                                .build();
                Transaction savedTransaction = transactionRepository.save(transaction);
                return mapToResponse(savedTransaction);
        }

        public List<TransactionResponse> getTransactions(String month, Long accountId, Long categoryId, String type) {
                List<Specification<Transaction>> specifications = new ArrayList<>();
                if (month != null && !month.isBlank()) {
                        specifications.add(TransactionSpecifications.byMonth(month));
                }
                if (accountId != null) {
                        specifications.add(TransactionSpecifications.byAccountId(accountId));
                }
                if (categoryId != null) {
                        specifications.add(TransactionSpecifications.byCategoryId(categoryId));
                }
                if (type != null && !type.isBlank()) {
                        specifications.add(TransactionSpecifications.byType(type));
                }

                List<Transaction> transactions;
                if (specifications.isEmpty()) {
                        transactions = transactionRepository.findAll();
                } else {
                        Specification<Transaction> combined = specifications.stream()
                                        .reduce(Specification::and)
                                        .orElseThrow();
                        transactions = transactionRepository.findAll(combined);
                }
                return transactions.stream()
                                .map(this::mapToResponse)
                                .toList();
        }

        @Transactional
        public void deleteTransaction(Long id) {
                Transaction transaction = transactionRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Transacción no encontrada con ID: " + id));
                transactionRepository.delete(transaction);
        }

        private TransactionResponse mapToResponse(Transaction transaction) {
                return TransactionResponse.builder()
                                .id(transaction.getId())
                                .accountId(transaction.getOriginAccount().getId())
                                .amount(transaction.getAmount())
                                .description(transaction.getDescription())
                                .category(transaction.getCategory().getName())
                                .transactionDate(transaction.getDate())
                                .createdAt(transaction.getCreated_at())
                                .build();
        }

}
