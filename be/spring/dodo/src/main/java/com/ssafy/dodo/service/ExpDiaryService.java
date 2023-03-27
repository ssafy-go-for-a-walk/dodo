package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.WriteExpDiaryDto;
import com.ssafy.dodo.entity.ExpDiary;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExpDiaryService {

    ExpDiary write(Long userSeq, Long bucketSeq, WriteExpDiaryDto dto, MultipartFile[] files);
    List<ExpDiary> getExpDiaryByAddedBucket(Long userSeq, Long bucketSeq, Pageable pageable);
}
