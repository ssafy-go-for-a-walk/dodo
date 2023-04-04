package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT ca FROM Category ca WHERE ca.item = :category")
    Optional<Category> findByItem(String category);
}
