package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketInfoDto;
import com.ssafy.dodo.dto.PublicBucketDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;

public interface BucketService {

    Map<String, Object> completeBucket(Long bucketSeq, UserDetails userDetails);

    List<AddedBucketDto> updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails);

    Page<PublicBucketDto> searchBucket(String word, Long category, Long bucketListSeq, Pageable pageable, UserDetails userDetails);

    List<AddedBucketDto> deleteBucket(Long bucketSeq, UserDetails userDetails);
}
