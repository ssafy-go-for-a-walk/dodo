package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.dto.CreateBucketListDto;
import com.ssafy.dodo.dto.SimpleBucketListDto;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.BucketListType;
import com.ssafy.dodo.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BucketListService {

    Map<String, Object> getBucketListInfo(UserDetails userDetails, Long bucketListSeq);

    List<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq);

    List<AddedBucketDto> addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails);

    Map<String, List<SimpleBucketListDto>> deleteBucketList(Long bucketListSeq, UserDetails userDetails);

    BucketListInfoDto updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails);

    BucketList createBucketList(User user, CreateBucketListDto dto, MultipartFile image);
    BucketList createBucketList(User user, String title, BucketListType type, MultipartFile image);
    Double getBucketListCompleteRate(Long bucketListSeq);
    String createInviteToken(Long bucketListSeq, Long inviterSeq);
}
