package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface BucketListService {

    Page<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq, Pageable pageable);

    void addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails);

    void deleteBucketList(Long bucketListSeq, UserDetails userDetails);

    void updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails);

}
