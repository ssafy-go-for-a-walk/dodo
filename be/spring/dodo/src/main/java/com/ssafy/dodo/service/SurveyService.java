package com.ssafy.dodo.service;

import com.ssafy.dodo.entity.PublicBucket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SurveyService {

    void submitSurvey(Long userSeq, List<Long> preferences);
    Page<PublicBucket> surveyBuckets(Pageable pageable);
}
