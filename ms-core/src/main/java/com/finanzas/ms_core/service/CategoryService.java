package com.finanzas.ms_core.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finanzas.ms_core.domain.dto.request.CategoryRequest;
import com.finanzas.ms_core.domain.dto.response.CategoryResponse;
import com.finanzas.ms_core.domain.model.Category;
import com.finanzas.ms_core.exception.RegistrationException;
import com.finanzas.ms_core.repository.CategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.findByName(request.getName()).isPresent()) {
            throw new RegistrationException("La categoría ya existe");
        }

        Category category = Category.builder()
                .name(request.getName())
                .type(request.getType())
                .build();

        Category savedCategory = categoryRepository.save(category);
        return mapCategoryResponse(savedCategory);
    }

    public List<CategoryResponse> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::mapCategoryResponse).toList();
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RegistrationException("La categoría no existe");
        }
        categoryRepository.deleteById(id);
    }

    private CategoryResponse mapCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .type(category.getType().name())
                .build();
    }

}
