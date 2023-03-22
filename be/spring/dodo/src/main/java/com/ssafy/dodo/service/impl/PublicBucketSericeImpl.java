package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.CustomBucketDto;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.PublicBucketSerice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PublicBucketSericeImpl implements PublicBucketSerice {

    private final PublicBucketRepository publicBucketRepository;
    private final AddedBucketRepository addedBucketRepository;
    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public void addCustomBucket(Long bucketListSeq, CustomBucketDto customBucketDto, UserDetails userDetails) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // public에 추가
        PublicBucket publicBucket = publicBucketRepository.save(PublicBucket.builder()
                .title(customBucketDto.getTitle())
                // TODO 이모지 랜덤 생성
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

    }
}
