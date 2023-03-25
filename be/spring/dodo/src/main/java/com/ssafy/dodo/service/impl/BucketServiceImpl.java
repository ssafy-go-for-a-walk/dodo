package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.BucketInfoDto;
import com.ssafy.dodo.dto.PublicBucketDto;
import com.ssafy.dodo.entity.*;
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
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            publicBuckets = publicBucketRepository.findAllByTitleContainingAndCategory(word, findCategory, pageable);
        }else{
            publicBuckets = publicBucketRepository.findAllByTitleContaining(word, pageable);
        }

        Page<PublicBucketDto> publicBucketDtos = publicBuckets.map(pb -> PublicBucketDto.builder()
                                                                                .publicBucketSeq(pb.getSeq())
                                                                                .emoji(pb.getEmoji())
                                                                                .title(pb.getTitle())
                                                                                .category(pb.getCategory().getItem())
                                                                                .addedCount(pb.getAddedCount())
                                                                                .build());

        return publicBucketDtos;
    }

    @Override
    public void deleteBucket(Long bucketSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        PublicBucket publicBucket = addedBucket.getPublicBucket();

        // added_buckets에서 담은 버킷 삭제
        addedBucketRepository.deleteById(bucketSeq);

        // addedBucket의 publicBucket의 선호도 삭제
        preferenceRepository.deleteAllByUserAndPublicBucket(user, publicBucket);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(Arrays.asList(publicBucket));

    }

    @Override
    public void completeBucket(Long bucketSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        addedBucket.completeBucket();

    }

    @Override
    public void updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        addedBucket.updateBucketInfo(bucketInfoDto.getEmoji(), bucketInfoDto.getDDay(), bucketInfoDto.getLocation(), bucketInfoDto.getDesc());
    }
}
