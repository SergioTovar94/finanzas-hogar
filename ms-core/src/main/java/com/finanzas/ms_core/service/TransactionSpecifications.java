package com.finanzas.ms_core.service;

import java.time.LocalDateTime;
import java.time.YearMonth;

import org.springframework.data.jpa.domain.Specification;

import com.finanzas.ms_core.domain.model.Transaction;

import jakarta.persistence.criteria.Join;

import com.finanzas.ms_core.domain.model.Category;

public class TransactionSpecifications {

    public static Specification<Transaction> byMonth(String month) {
        if (month == null || month.isBlank())
            return null;
        YearMonth ym = YearMonth.parse(month); // formato "YYYY-MM"
        LocalDateTime start = ym.atDay(1).atStartOfDay();
        LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59);
        return (root, query, cb) -> cb.between(root.get("date"), start, end);
    }

    public static Specification<Transaction> byAccountId(Long accountId) {
        if (accountId == null)
            return null;
        return (root, query, cb) -> cb.equal(root.get("originAccount").get("id"), accountId);
    }

    public static Specification<Transaction> byCategoryId(Long categoryId) {
        if (categoryId == null)
            return null;
        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Transaction> byType(String type) {
        if (type == null || type.isBlank())
            return null;
        return (root, query, cb) -> {
            Join<Transaction, Category> categoryJoin = root.join("category");
            return cb.equal(categoryJoin.get("type"), type);
        };
    }

}
