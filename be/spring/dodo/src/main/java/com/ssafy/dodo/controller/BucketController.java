package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.BucketInfoDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.service.BucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bucket")
public class BucketController {

    private final BucketService bucketService;

    // TODO 자동 완성

    @PostMapping("/{bucket-seq}/complete")
    @ResponseStatus(HttpStatus.OK)
    public void completeBucket(
            @PathVariable("bucket-seq") Long bucketSeq,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        bucketService.completeBucket(bucketSeq, userDetails);
    }

    // 담긴 버킷 상세 정보 수정
    @PatchMapping("/{bucket-seq}")
    @ResponseStatus(HttpStatus.OK)
    public void updateBucketListInfo(
            @PathVariable("bucket-seq") Long bucketSeq,
            @RequestBody BucketInfoDto bucketInfoDto,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        bucketService.updateBucketInfo(bucketSeq, bucketInfoDto, userDetails);
    }

    // TODO 담긴 버킷 삭제
}
