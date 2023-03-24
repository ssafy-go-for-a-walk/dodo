package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.CustomBucketDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface PublicBucketSerice {
    void addCustomBucket(Long bucketListSeq, CustomBucketDto customBucketDto, UserDetails userDetails);
}
