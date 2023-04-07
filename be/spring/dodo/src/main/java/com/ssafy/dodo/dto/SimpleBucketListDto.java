package com.ssafy.dodo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dodo.entity.BucketListType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class SimpleBucketListDto {

    private Long seq;
    private String title;
    private Double completeRate;
    private BucketListType type;

    public SimpleBucketListDto(Long seq, String title, Double completeRate, BucketListType type) {
        this.seq = seq;
        this.title = title;
        // 소수점 첫번째짜리까지 반올림
        this.completeRate = completeRate == null ? 0 : (double) Math.round(completeRate * 10) / 10;
        this.type = type;
    }
}
