package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.entity.Preference;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.PreferenceRepository;
import com.ssafy.dodo.repository.PublicBucketRepository;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    private final UserRepository userRepository;
    private final PublicBucketRepository publicBucketRepository;
    private final PreferenceRepository preferenceRepository;

    @Override
    public void submitSurvey(Long userSeq, List<Long> preferences) {
        // 사용자 조회
        User user = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 설문조사에서 선택한 public 버킷들 조회
        List<PublicBucket> publicBuckets = publicBucketRepository.findAllBySeqIn(preferences);

        // 사용자 선호도 저장
        List<Preference> preferenceList = publicBuckets.stream().map(pb -> Preference.builder()
                        .user(user)
                        .publicBucket(pb)
                        .build())
                .collect(Collectors.toList());
        preferenceRepository.saveAll(preferenceList);
    }
}
