package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.BucketInfoDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface BucketService {

    void updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails);
}
