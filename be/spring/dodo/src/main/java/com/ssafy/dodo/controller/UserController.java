package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.*;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
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

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final BucketListService bucketListService;

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
        long userSeq = Long.parseLong(userDetails.getUsername());
        userService.initUserInfo(userSeq, dto, profileImage);
        return new CommonResponse(true);
    }

    @PostMapping("/bucketlist")
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
