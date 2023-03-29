package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.*;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.BucketListRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.BucketListService;
import com.ssafy.dodo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

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

        List<UserInfoDto> result = userRepository.findUserInfoBySeq(userSeq, PageRequest.of(0, 1));
        if (result.size() == 0) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        UserInfoDto userInfoDto = result.get(0);

        // 기본 버킷리스트의 달성률 조회
        Double completeRate = bucketListService.getBucketListCompleteRate(userInfoDto.getDefaultBucketList().getSeq());
        userInfoDto.getDefaultBucketList().setCompleteRate(completeRate);

        return new DataResponse<>(userInfoDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse setUserProfile(
            @RequestPart("data") InitUserDto dto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
            @AuthenticationPrincipal UserDetails userDetails) {
        // user 정보 저장 및 설문결과 선호도에 추가
        long userSeq = Long.parseLong(userDetails.getUsername());
        userService.initUserInfo(userSeq, dto, profileImage);

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

    @GetMapping("/check/nickname")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<Map<String, Boolean>> checkNickname(@RequestParam("nn") String nickname) {
        Pattern pattern = Pattern.compile("[!@#$%^&*(),.?\":{}|<>]");
        log.info("nickname: {}", nickname);
        boolean isAvailable = true;
        if (nickname == null || nickname.isBlank() || pattern.matcher(nickname).find() || userRepository.existsByNickname(nickname)) {
            // 빈 문자열이거나 특수문자가 있거나 이미 존재하는 닉네임이면 사용불가
            isAvailable = false;
        }

        Map<String, Boolean> data = new HashMap<>();
        data.put("isAvailable", isAvailable);
        return new DataResponse<>(data);
    }
}
