package com.ssafy.dodo.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PublicBucketDto {
    private Long publicBucketSeq;
    private String emoji;
    private String title;
    private Long addedCount;
    private CategoryInfoDto category;

    @Builder
    public PublicBucketDto(Long publicBucketSeq, String emoji, String title, Long addedCount, CategoryInfoDto category) {
        this.publicBucketSeq = publicBucketSeq;
        this.emoji = emoji;
        this.title = title;
        this.addedCount = addedCount;
        this.category = category;
    }
}
