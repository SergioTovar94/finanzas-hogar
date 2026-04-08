package com.finanzas.ms_core.service;

import org.springframework.data.jpa.domain.Specification;

import com.finanzas.ms_core.domain.model.Category;

public class CategorySpecifications {

    public static Specification<Category> byType(String type) {
        if (type == null)
            return null;
        return (root, query, cb) -> cb.equal(root.get("type"), type);
    }

}
