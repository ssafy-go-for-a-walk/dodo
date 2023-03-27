package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.WriteExpDiaryDto;
import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.DiaryImage;
import com.ssafy.dodo.entity.ExpDiary;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.AddedBucketRepository;
import com.ssafy.dodo.repository.ExpDiaryImageRepository;
import com.ssafy.dodo.repository.ExpDiaryRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.ExpDiaryService;
import com.ssafy.dodo.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ExpDiaryServiceImpl implements ExpDiaryService {

    private final ExpDiaryRepository expDiaryRepository;
    private final ExpDiaryImageRepository expDiaryImageRepository;
    private final UserRepository userRepository;
    private final AddedBucketRepository addedBucketRepository;
    private final S3FileService s3FileService;

    @Override
    public ExpDiary write(Long userSeq, Long bucketSeq, WriteExpDiaryDto dto, MultipartFile[] files) {
        // 버킷이 요청한 사람의 것인 맞는지 확인
        User writer = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket bucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_NOT_FOUND));

        if (!writer.getSeq().equals(bucket.getCreatedBy())) {
            throw new CustomException(ErrorCode.NOT_BUCKET_OWNER);
        }

        // 경험일기 생성 및 저장
        ExpDiary expDiary = ExpDiary.builder()
                .addedBucket(bucket)
                .content(dto.getContent())
                .build();

        expDiaryRepository.save(expDiary);

        // 이미지 업로드 및 저장
        List<DiaryImage> diaryImages = new ArrayList<>();
        if (files != null && files[0].getSize() != 0) {
            // 업로드된 파일이 있을 때 저장
            for (MultipartFile file : files) {
                String path = s3FileService.uploadFile(file);
                DiaryImage diaryImage = DiaryImage.builder()
                        .expDiary(expDiary)
                        .originalName(file.getOriginalFilename())
                        .path(path)
                        .build();

                diaryImages.add(diaryImage);
            }

            expDiaryImageRepository.saveAll(diaryImages);
        }

        return expDiary;
    }

    @Override
    public List<ExpDiary> getExpDiaryByAddedBucket(Long userSeq, Long bucketSeq, Pageable pageable) {
        // 버킷이 요청한 사람의 것인 맞는지 확인
        User writer = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        AddedBucket bucket = addedBucketRepository.findById(bucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_NOT_FOUND));

        if (!writer.getSeq().equals(bucket.getCreatedBy())) {
            throw new CustomException(ErrorCode.NOT_BUCKET_OWNER);
        }

        // 경험일기 조회
        return expDiaryRepository.findAllByAddedBucket(bucket, pageable);
    }
}
