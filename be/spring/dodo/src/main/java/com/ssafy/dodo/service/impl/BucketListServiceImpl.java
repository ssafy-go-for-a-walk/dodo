package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.BucketListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BucketListServiceImpl implements BucketListService {

    private final AddedBucketRepository addedBucketRepository;
    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final PublicBucketRepository publicBucketRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public Page<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq, Pageable pageable) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Page<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketListSeq, pageable);

        Page<AddedBucketDto> addedBucketDtos = allByBucketList
                .map(a -> AddedBucketDto.builder()
                        .addedBucketSeq(a.getSeq())
                        .bucketListSeq(a.getBucketList().getSeq())
                        .bucketSeq(a.getPublicBucket().getSeq())
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build());

        return addedBucketDtos;
    }

    @Override
    public void addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        PublicBucket publicBucket = publicBucketRepository.findById(publicBucketSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // added_bucket
        addedBucketRepository.save(AddedBucket.builder()
                        .isComplete(false)
                        .emoji(publicBucket.getEmoji())
                        .bucketList(bucketList)
                        .publicBucket(publicBucket)
                        .build()
        );

        // preference
        addedBucketRepository.save(AddedBucket.builder()
                .emoji(publicBucket.getEmoji())
                .isComplete(false)
                .bucketList(bucketList)
                .publicBucket(publicBucket)
                .build());

        // public_bucket 담은 수 +1
        publicBucket.updateAddedCount();
    }

    @Override
    public void deleteBucketList(Long bucketListSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 버킷리스트에 있는 added_buckets 다 삭제
//        addedBucketRepository.deleteAllByBucketList(bucketListSeq);

        // added_buckets의 public_buckets의 선호도 삭제
        // added의 버킷 식별자로 pref에서 삭제


        // 버킷리스트 삭제
//        bucketListRepository.delete(bucketList);
    }
}
