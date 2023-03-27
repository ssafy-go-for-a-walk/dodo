package com.ssafy.dodo.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SocialBucketDto {
    private String emoji;
    private Long category;
    private String title;

    @Builder
    public SocialBucketDto(String emoji, Long category, String title) {
        this.emoji = emoji;
        this.category = category;
        this.title = title;
    }
}
