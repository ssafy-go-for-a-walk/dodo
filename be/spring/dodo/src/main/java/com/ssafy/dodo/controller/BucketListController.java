package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.dto.CustomBucketDto;
import com.ssafy.dodo.dto.DataResponse;
import com.ssafy.dodo.dto.ExpDiaryInfoDto;
import com.ssafy.dodo.entity.ExpDiary;
import com.ssafy.dodo.service.BucketListService;
import com.ssafy.dodo.service.ExpDiaryService;
import com.ssafy.dodo.service.PublicBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/bucketlists")
public class BucketListController {

    private final BucketListService bucketListService;
    private final PublicBucketService publicBucketService;
    private final ExpDiaryService expDiaryService;

    @GetMapping("/{bucketlist-seq}")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> getBucketListBuckets(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable
    ){

        return new DataResponse<>(bucketListService.getBucketListBuckets(userDetails, bucketListSeq, pageable));
    }

    @PostMapping("/{bucketlist-seq}/buckets")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCustomBucket(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            @RequestBody CustomBucketDto customBucketDto,
            @AuthenticationPrincipal UserDetails userDetails
    ){

        publicBucketService.addCustomBucket(bucketListSeq, customBucketDto, userDetails);
    }

    @PostMapping("/{bucketlist-seq}/buckets/{public-bucket-seq}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addSearchedBucket(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            @PathVariable("public-bucket-seq") Long publicBucketSeq,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        bucketListService.addSearchedBucket(bucketListSeq, publicBucketSeq, userDetails);
    }

    @PatchMapping("/{bucketlist-seq}")
    @ResponseStatus(HttpStatus.OK)
    public void updateBucketListInfo(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            @RequestPart("bucketlistinfo") BucketListInfoDto bucketListInfoDto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails
    ){
         bucketListService.updateBucketListInfo(bucketListSeq, bucketListInfoDto, file, userDetails);
    }

    @DeleteMapping("/{bucketlist-seq}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBucketList(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            @AuthenticationPrincipal UserDetails userDetails
    ){
       bucketListService.deleteBucketList(bucketListSeq, userDetails);
    }

    @GetMapping("/{bucketlist-seq}/diaries")
    public DataResponse<Page<ExpDiaryInfoDto>> getExpDiariesByBucketList(
            @PathVariable("bucketlist-seq") Long bucketListSeq,
            Pageable pageable,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userSeq = Long.parseLong(userDetails.getUsername());
        List<ExpDiary> expDiaries = expDiaryService.getExpDiaryByBucketList(userSeq, bucketListSeq, pageable);
        List<ExpDiaryInfoDto> content = expDiaries.stream()
                .map(ExpDiaryInfoDto::of)
                .collect(Collectors.toList());

        Page<ExpDiaryInfoDto> data = new PageImpl<>(content, pageable, content.size());
        return new DataResponse<>(data);
    }
}
