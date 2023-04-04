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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final BucketListRepository bucketListRepository;

    @Override
    public Page<PublicBucketDto> searchBucket(String word, Long category, Long bucketListSeq, Pageable pageable, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList);

        List<PublicBucket> userAddedPublicBuckets = addedBuckets.stream()
                .map(a -> a.getPublicBucket()).collect(Collectors.toList());

        Page<PublicBucket> publicBuckets = null;
        if(category != null){

            Category findCategory = categoryRepository.findById(category)
                    .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

            publicBuckets = publicBucketRepository.findAllByTitleContainingAndCategoryAndIsPublic(word, findCategory, true, pageable);
        }else{
            publicBuckets = publicBucketRepository.findAllByTitleContainingAndIsPublic(word, true, pageable);
        }

        Page<PublicBucketDto> publicBucketDtos = publicBuckets.map(pb -> PublicBucketDto.builder()
                                                                                .publicBucketSeq(pb.getSeq())
                                                                                .emoji(pb.getEmoji())
                                                                                .title(pb.getTitle())
                                                                                .category(pb.getCategory() == null ? null : CategoryInfoDto.of(pb.getCategory()))
                                                                                .addedCount(pb.getAddedCount())
                                                                                .isAdded(
                                                                                        userAddedPublicBuckets.contains(pb) ? true : false
                                                                                )
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

        // addedBucket의 publicBucket의 선호도 삭제
        preferenceRepository.deleteAllByUserAndPublicBucket(user, publicBucket);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(Arrays.asList(publicBucket));

        // added_buckets에서 담은 버킷 삭제
        addedBucketRepository.deleteById(bucketSeq);

        BucketList bucketList = addedBucket.getBucketList();

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() != null ? CategoryInfoDto.of(a.getPublicBucket().getCategory()) : null)
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
    public Map<String, Object> completeBucket(Long bucketSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.ADDED_BUCKET_NOT_FOUND));

        BucketList bucketList = addedBucket.getBucketList();

        addedBucket.completeToggleBucket();

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        double part = allByBucketList.stream().filter(bl -> bl.isComplete()).collect(Collectors.toList()).size();
        double total = allByBucketList.size();

        double completeRate = (double) Math.round(part / total * 100 * 10) / 10;

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() != null ? CategoryInfoDto.of(a.getPublicBucket().getCategory()) : null)
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build())
                .collect(Collectors.toList());


        Map<String, Object> result = new HashMap<>();
        result.put("completeRate", completeRate);
        result.put("buckets", addedBucketDtos);

        return result;
    }

    @Override
    public List<AddedBucketDto> updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.ADDED_BUCKET_NOT_FOUND));

        // 사용자 정의 버킷의 카테고리는 본인이 최초 1회만 바꿀 수 있다.
        if(addedBucket.getPublicBucket().getCategory() == null && addedBucket.getPublicBucket().getCreatedBy() == user.getSeq()){
            PublicBucket publicBucket = addedBucket.getPublicBucket();
            Category category = categoryRepository.findByItem(bucketInfoDto.getCategory())
                    .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

            publicBucket.updateCategory(category);
        }

        addedBucket.updateBucketInfo(bucketInfoDto.getEmoji(), bucketInfoDto.getDDay(), bucketInfoDto.getLocation(), bucketInfoDto.getDesc());

        BucketList bucketList = addedBucket.getBucketList();

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() != null ? CategoryInfoDto.of(a.getPublicBucket().getCategory()) : null)
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
