package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.CategoryInfoDto;
import com.ssafy.dodo.dto.CustomBucketDto;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.PublicBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PublicBucketServiceImpl implements PublicBucketService {

    private final PublicBucketRepository publicBucketRepository;
    private final AddedBucketRepository addedBucketRepository;
    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public List<AddedBucketDto> addCustomBucket(Long bucketListSeq, CustomBucketDto customBucketDto, UserDetails userDetails) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        // public에 추가
        PublicBucket publicBucket = publicBucketRepository.save(PublicBucket.builder()
                .title(customBucketDto.getTitle())
                .emoji("\uD83D\uDE00") // 😀
                .addedCount(1l)
                .build());

        // 내 버킷리스트에 추가
        addedBucketRepository.save(AddedBucket.builder()
                .emoji(publicBucket.getEmoji())
                .isComplete(false)
                .bucketList(bucketList)
                .publicBucket(publicBucket)
                .build());

        // 선호도에 추가
        preferenceRepository.save(Preference.builder()
                .user(user)
                .publicBucket(publicBucket)
                .build());

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(CategoryInfoDto.of(a.getPublicBucket().getCategory()))
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build())
                .collect(Collectors.toList());

        return addedBucketDtos;
    }
}
