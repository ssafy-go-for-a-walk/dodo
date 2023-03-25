package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.InitUserDto;
import com.ssafy.dodo.dto.UserInfoDto;
import com.ssafy.dodo.entity.Preference;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.PreferenceRepository;
import com.ssafy.dodo.repository.PublicBucketRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.S3FileService;
import com.ssafy.dodo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3FileService s3FileService;
    private final PublicBucketRepository publicBucketRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public void updateUserInfo(Long userSeq, InitUserDto dto, MultipartFile profileImage) {

    }

    @Override
    public void initUserInfo(Long userSeq, InitUserDto dto, MultipartFile profileImage) {
        // user 조회
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String imagePath = null;

        // profile image를 s3에 저장
        if (profileImage != null) {
            imagePath = s3FileService.uploadFile(profileImage);
        }

        // nickname, profile image 저장
        user.initUserInfo(dto.getNickname(), imagePath);

        // public bucket 조회
        List<PublicBucket> publicBuckets = publicBucketRepository.findAllBySeqIn(dto.getPreferenceBuckets());

        // 선호도 저장
        List<Preference> preferences = publicBuckets.stream()
                .map(pb -> Preference.builder()
                        .user(user)
                        .publicBucket(pb)
                        .build())
                .collect(Collectors.toList());
        preferenceRepository.saveAll(preferences);
    }
}
