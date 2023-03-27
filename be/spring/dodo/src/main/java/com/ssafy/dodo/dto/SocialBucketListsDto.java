package com.ssafy.dodo.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SocialBucketListsDto {
    private Long bucketListSeq;
    private String title;
    private String bucketListImage;
    private String nickname;
    private String userImage;
    private List<SocialBucketDto> buckets = new ArrayList<>();

    @Builder
    public SocialBucketListsDto(Long bucketListSeq, String title, String bucketListImage, String nickname, String userImage, List<SocialBucketDto> buckets) {
        this.bucketListSeq = bucketListSeq;
        this.title = title;
        this.bucketListImage = bucketListImage;
        this.nickname = nickname;
        this.userImage = userImage;
        this.buckets = buckets;
    }
}
