package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.InitUserDto;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3FileService s3FileService;

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
        if (profileImage != null && !profileImage.isEmpty() && profileImage.getSize() > 0) {
            imagePath = s3FileService.uploadFile(profileImage);
        }

        // nickname, profile image 저장
        user.initUserInfo(dto.getNickname(), imagePath);
    }
}
