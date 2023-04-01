package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.CommonResponse;
import com.ssafy.dodo.dto.DataResponse;
import com.ssafy.dodo.dto.SurveyBucketInfoDto;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    @GetMapping("/buckets")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<Page<SurveyBucketInfoDto>> getSurveyBucket(Pageable pageable) {
        Page<PublicBucket> bucketPage = surveyService.surveyBuckets(pageable);
        return new DataResponse<>(SurveyBucketInfoDto.toPagingDto(bucketPage));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse submitSurvey(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, List<Long>> data) {
        Long userSeq = Long.parseLong(userDetails.getUsername());
        surveyService.submitSurvey(userSeq, data.get("preferences"));

        return new CommonResponse(true);
    }
}
