package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.WriteExpDiaryDto;
import com.ssafy.dodo.entity.ExpDiary;
import org.springframework.web.multipart.MultipartFile;

public interface ExpDiaryService {

    ExpDiary write(Long userSeq, Long bucketSeq, WriteExpDiaryDto dto, MultipartFile[] files);
}
