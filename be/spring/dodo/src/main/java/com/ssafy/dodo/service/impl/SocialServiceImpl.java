package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.SocialBucketDto;
import com.ssafy.dodo.dto.SocialBucketListsDto;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.AddedBucketRepository;
import com.ssafy.dodo.repository.BucketListRepository;
import com.ssafy.dodo.repository.PublicBucketRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SocialServiceImpl implements SocialService {

    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final AddedBucketRepository addedBucketRepository;
    private final PublicBucketRepository publicBucketRepository;

    @Override
    public Page<SocialBucketListsDto> getSocialBucketLists(Pageable pageable, UserDetails userDetails) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Page<BucketList> bucketLists = bucketListRepository.findAllByIsPublic(true, pageable);

        return bucketLists.map(bucketList -> SocialBucketListsDto.builder()
                .bucketListSeq(bucketList.getSeq())
                .title(bucketList.getTitle())
                .bucketListImage(bucketList.getImage())
                .buckets(
                        addedBucketRepository.findAllByBucketList(bucketList,null).stream()
                                .map(addedBucket -> SocialBucketDto.builder()
                                        .title(addedBucket.getPublicBucket().getTitle())
                                        .emoji(addedBucket.getEmoji())
                                        .category(addedBucket.getPublicBucket().getCategory().getSeq())
                                        .build())
                                .collect(Collectors.toList())
                )
                .build());
    }
}