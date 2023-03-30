package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.dto.CreateBucketListDto;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.BucketListType;
import com.ssafy.dodo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BucketListService {

    Map<String, Object> getBucketListInfo(UserDetails userDetails, Long bucketListSeq);

    List<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq);

    void addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails);

    void deleteBucketList(Long bucketListSeq, UserDetails userDetails);

    void updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails);

    BucketList createBucketList(User user, CreateBucketListDto dto, MultipartFile image);
    BucketList createBucketList(User user, String title, BucketListType type, MultipartFile image);
    Double getBucketListCompleteRate(Long bucketListSeq);
    String createInviteToken(Long bucketListSeq, Long inviterSeq);
}
