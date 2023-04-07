package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.WriteExpDiaryDto;
import com.ssafy.dodo.entity.ExpDiary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ExpDiaryService {

    ExpDiary write(Long userSeq, Long bucketSeq, WriteExpDiaryDto dto, MultipartFile[] files);
    Page<ExpDiary> getExpDiaryByAddedBucket(Long userSeq, Long bucketSeq, Pageable pageable);
    Page<ExpDiary> getExpDiaryByBucketList(Long userSeq, Long bucketListSeq, Pageable pageable);
    Page<ExpDiary> getExpDiaryBySharedBucketList(String shareToken, Pageable pageable);
}
