package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
