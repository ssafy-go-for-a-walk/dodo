package com.ssafy.dodo.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
public class SocialBucketListsDto {
    private Map<String, String> user;
    private Map<String, String> bucketlist;
    private List<SocialBucketDto> buckets = new ArrayList<>();

    @Builder
    public SocialBucketListsDto(Map<String, String> user, Map<String, String> bucketlist, List<SocialBucketDto> buckets) {
        this.user = user;
        this.bucketlist = bucketlist;
        this.buckets = buckets;
    }
}
