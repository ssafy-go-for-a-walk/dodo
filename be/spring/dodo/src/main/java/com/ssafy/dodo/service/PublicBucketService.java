package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.CustomBucketDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface PublicBucketService {
    List<AddedBucketDto> addCustomBucket(Long bucketListSeq, CustomBucketDto customBucketDto, UserDetails userDetails);
}
