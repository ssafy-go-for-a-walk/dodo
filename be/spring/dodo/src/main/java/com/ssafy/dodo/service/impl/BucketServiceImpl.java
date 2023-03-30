package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketInfoDto;
import com.ssafy.dodo.dto.CategoryInfoDto;
import com.ssafy.dodo.dto.PublicBucketDto;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.BucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BucketServiceImpl implements BucketService {

    private final UserRepository userRepository;
    private final AddedBucketRepository addedBucketRepository;
    private final PublicBucketRepository publicBucketRepository;
    private final CategoryRepository categoryRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public Page<PublicBucketDto> searchBucket(String word, Long category, Pageable pageable, UserDetails userDetails) {

        Page<PublicBucket> publicBuckets = null;
        if(category != null){

            Category findCategory = categoryRepository.findById(category)
                    .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

            publicBuckets = publicBucketRepository.findAllByTitleContainingAndCategory(word, findCategory, pageable);
        }else{
            publicBuckets = publicBucketRepository.findAllByTitleContaining(word, pageable);
        }

        Page<PublicBucketDto> publicBucketDtos = publicBuckets.map(pb -> PublicBucketDto.builder()
                                                                                .publicBucketSeq(pb.getSeq())
                                                                                .emoji(pb.getEmoji())
                                                                                .title(pb.getTitle())
                                                                                .category(CategoryInfoDto.of(pb.getCategory()))
                                                                                .addedCount(pb.getAddedCount())
                                                                                .build());

        return publicBucketDtos;
    }

    @Override
    public List<AddedBucketDto> deleteBucket(Long bucketSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.ADDED_BUCKET_NOT_FOUND));

        PublicBucket publicBucket = addedBucket.getPublicBucket();

        // added_buckets에서 담은 버킷 삭제
        addedBucketRepository.deleteById(bucketSeq);

        // addedBucket의 publicBucket의 선호도 삭제
        preferenceRepository.deleteAllByUserAndPublicBucket(user, publicBucket);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(Arrays.asList(publicBucket));

        BucketList bucketList = addedBucket.getBucketList();

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

    @Override
    public double completeBucket(Long bucketSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.ADDED_BUCKET_NOT_FOUND));

        log.info(String.valueOf(addedBucketRepository.countByBucketListAndIsComplete(addedBucket.getBucketList(), true)));
        log.info(String.valueOf(addedBucketRepository.countByBucketList(addedBucket.getBucketList())));

        addedBucket.completeBucket();

        double part = addedBucketRepository.countByBucketListAndIsComplete(addedBucket.getBucketList(), true);
        double total = addedBucketRepository.countByBucketList(addedBucket.getBucketList());
        double completeRate = (double) Math.round(part / total * 100 * 10) / 10;

//        log.info("{} / {} * 100 = {} -> {}", part, total, part/total*100, completeRate);

        return completeRate;
    }

    @Override
    public List<AddedBucketDto> updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.ADDED_BUCKET_NOT_FOUND));

        addedBucket.updateBucketInfo(bucketInfoDto.getEmoji(), bucketInfoDto.getDDay(), bucketInfoDto.getLocation(), bucketInfoDto.getDesc());

        BucketList bucketList = addedBucket.getBucketList();

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
