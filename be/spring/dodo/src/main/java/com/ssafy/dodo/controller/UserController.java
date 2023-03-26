package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.*;
import com.ssafy.dodo.entity.BucketListType;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.BucketListRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.BucketListService;
import com.ssafy.dodo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final BucketListService bucketListService;
    private final BucketListRepository bucketListRepository;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<UserInfoDto> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        Long userSeq = Long.parseLong(userDetails.getUsername());
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return new DataResponse<>(UserInfoDto.of(user));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse setUserProfile(
            @RequestPart("data") InitUserDto dto,
            @RequestPart("profileImage") MultipartFile profileImage,
            @AuthenticationPrincipal UserDetails userDetails) {
        // user 정보 저장 및 설문결과 선호도에 추가
        long userSeq = Long.parseLong(userDetails.getUsername());
        userService.initUserInfo(userSeq, dto, profileImage);

        // 기본 버킷리스트 생성
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        String defaultTitle = user.getNickname() + "님의 버킷리스트";
        bucketListService.createBucketList(user, defaultTitle, BucketListType.SINGLE, null);

        return new CommonResponse(true);
    }

    @GetMapping("/bucketlists")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<List<SimpleBucketListDto>> getMyBucketLists(@AuthenticationPrincipal UserDetails userDetails) {
        Long userSeq = Long.parseLong(userDetails.getUsername());
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return new DataResponse<>(bucketListRepository.getBucketListByUserWithCompleteRate(user));
    }

    @PostMapping("/bucketlists")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse createBucketList(
            @RequestPart("data") CreateBucketListDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal UserDetails userDetails) {
        // 요청한 사용자 조회
        Long userSeq = Long.parseLong(userDetails.getUsername());
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 버킷리스트 생성
        bucketListService.createBucketList(user, dto, image);
        return new CommonResponse(true);
    }
}
