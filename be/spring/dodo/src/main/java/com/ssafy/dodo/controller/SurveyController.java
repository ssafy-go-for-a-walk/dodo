package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.CommonResponse;
import com.ssafy.dodo.service.SurveyService;
import lombok.RequiredArgsConstructor;
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
