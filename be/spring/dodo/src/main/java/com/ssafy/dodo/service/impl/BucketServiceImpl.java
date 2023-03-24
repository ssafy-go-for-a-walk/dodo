package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.BucketInfoDto;
import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.AddedBucketRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.BucketService;
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
public class BucketServiceImpl implements BucketService {

    private final UserRepository userRepository;
    private final AddedBucketRepository addedBucketRepository;

    @Override
    public void updateBucketInfo(Long bucketSeq, BucketInfoDto bucketInfoDto, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        AddedBucket addedBucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        addedBucket.updateBucketInfo(bucketInfoDto.getEmoji(), bucketInfoDto.getDDay(), bucketInfoDto.getLocation(), bucketInfoDto.getDesc());
    }
}
