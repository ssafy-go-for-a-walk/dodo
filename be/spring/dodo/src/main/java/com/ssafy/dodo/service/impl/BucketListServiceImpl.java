package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.BucketListService;
import com.ssafy.dodo.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    private final S3FileService s3FileService;

    @Override
    public Page<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq, Pageable pageable) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Page<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList, pageable);

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
        publicBucketRepository.plusAddedCount(Arrays.asList(publicBucket));
    }

    @Override
    public void updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if(file != null)
            bucketList.updateBucketListImage(s3FileService.uploadFile(file));

        bucketList.updateBucketListInfo(bucketListInfoDto.getTitle(), bucketListInfoDto.getIsPublic());
    }

    @Override
    public void deleteBucketList(Long bucketListSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // added_buckets의 public_buckets의 선호도 삭제
        List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList, null).getContent();

        List<PublicBucket> publicBuckets = addedBuckets.stream()
                .map(a -> a.getPublicBucket()).collect(Collectors.toList());

        preferenceRepository.deleteAllByUserAndPublicBucketIn(user, publicBuckets);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(publicBuckets);

        // 버킷리스트에 있는 added_buckets 다 삭제
        addedBucketRepository.deleteByBucketList(bucketList);

        // 버킷리스트 삭제
        bucketListRepository.delete(bucketList);
    }
}
