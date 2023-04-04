package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.CustomBucketDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;

public interface PublicBucketService {
    Map<String, Object> addCustomBucket(Long bucketListSeq, CustomBucketDto customBucketDto, UserDetails userDetails);
}
