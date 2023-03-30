package com.ssafy.dodo.service;

import java.util.List;

public interface SurveyService {

    void submitSurvey(Long userSeq, List<Long> preferences);
}
