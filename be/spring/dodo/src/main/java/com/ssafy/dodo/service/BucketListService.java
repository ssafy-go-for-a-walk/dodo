package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

public interface BucketListService {

    Page<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq, Pageable pageable);

    void addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails);

    void deleteBucketList(Long bucketListSeq, UserDetails userDetails);
}
