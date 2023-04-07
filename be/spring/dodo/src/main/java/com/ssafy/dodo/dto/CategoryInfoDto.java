package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CategoryInfoDto {

    private Long seq;
    private String item;

    public static CategoryInfoDto of(Category category) {
        CategoryInfoDto dto = new CategoryInfoDto();
        dto.seq = category.getSeq();
        dto.item = category.getItem();
        return dto;
    }
}
