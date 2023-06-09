package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.*;
import com.ssafy.dodo.entity.Category;
import com.ssafy.dodo.entity.ExpDiary;
import com.ssafy.dodo.repository.CategoryRepository;
import com.ssafy.dodo.service.BucketService;
import com.ssafy.dodo.service.ExpDiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
@RequestMapping("/buckets")
public class BucketController {

    private final BucketService bucketService;
    private final CategoryRepository categoryRepository;
    private final ExpDiaryService expDiaryService;

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> searchBucket(
            @RequestParam("q") String word,
            @RequestParam(value = "category", required = false) Long category,
            @RequestParam(value = "bucketlist", required = true) Long bucketListSeq,
            Pageable pageable,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new DataResponse<>(bucketService.searchBucket(word, category, bucketListSeq, pageable, userDetails));
    }


    @PostMapping("/{bucket-seq}/complete")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> completeBucket(
            @PathVariable("bucket-seq") Long bucketSeq,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new DataResponse<>(bucketService.completeBucket(bucketSeq, userDetails));
    }

    // 담긴 버킷 상세 정보 수정
    @PatchMapping("/{bucket-seq}")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> updateBucketInfo(
            @PathVariable("bucket-seq") Long bucketSeq,
            @RequestBody BucketInfoDto bucketInfoDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new DataResponse<>(bucketService.updateBucketInfo(bucketSeq, bucketInfoDto, userDetails));
    }

    @DeleteMapping("/{bucket-seq}")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> deleteBucketList(
            @PathVariable("bucket-seq") Long bucketSeq,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new DataResponse<>(bucketService.deleteBucket(bucketSeq, userDetails));
    }

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<List<CategoryInfoDto>> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryInfoDto> categoryInfoDtoList = categories.stream()
                .map(CategoryInfoDto::of)
                .collect(Collectors.toList());
        return new DataResponse<>(categoryInfoDtoList);
    }

    @GetMapping("/{bucket-seq}/diaries")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<Page<ExpDiaryInfoDto>> getExpDiaryByBucket(
            @PathVariable("bucket-seq") Long bucketSeq,
            Pageable pageable,
            @AuthenticationPrincipal UserDetails userDetails) {
        /**
         * 경험일기 조회 기능 최적화 필요
         * 현재 각 경험일기에서 저장된 이미지 조회하기 위해 경험일기마다 select 쿼리 실행
         * 경험일기의 이미지까지 join fetch 시 메모리 터짐
         */
        Long userSeq = Long.parseLong(userDetails.getUsername());
        Page<ExpDiary> expDiaryPage = expDiaryService.getExpDiaryByAddedBucket(userSeq, bucketSeq, pageable);

        return new DataResponse<>(ExpDiaryInfoDto.toPagingDto(expDiaryPage));
    }

    @PostMapping("/{bucket-seq}/diaries")
    @ResponseStatus(HttpStatus.CREATED)
    public DataResponse<Page<ExpDiaryInfoDto>> writeExpDiary(
            @PathVariable("bucket-seq") Long bucketSeq,
            @RequestPart("data") WriteExpDiaryDto dto,
            @RequestPart(value = "files", required = false) MultipartFile[] files,
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable) {
        Long userSeq = Long.parseLong(userDetails.getUsername());
        expDiaryService.write(userSeq, bucketSeq, dto, files);

        // 생성된 경험일기를 포함한 해당 버킷에 대한 경험일기 응답(요청사항)
        Page<ExpDiary> expDiaryPage = expDiaryService.getExpDiaryByAddedBucket(userSeq, bucketSeq, pageable);

        return new DataResponse<>(ExpDiaryInfoDto.toPagingDto(expDiaryPage));
    }
}
