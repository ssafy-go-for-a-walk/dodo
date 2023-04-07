package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.DiaryImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpDiaryImageRepository extends JpaRepository<DiaryImage, Long> {

    List<DiaryImage> findAllBySeqIn(List<Long> seq);
}
