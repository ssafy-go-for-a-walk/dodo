package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.BucketListType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateBucketListDto {

    private String title;
    private BucketListType type;
}
