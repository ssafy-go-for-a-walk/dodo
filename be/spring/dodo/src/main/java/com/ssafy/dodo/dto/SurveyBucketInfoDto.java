package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.PublicBucket;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class SurveyBucketInfoDto {

    private Long seq;
    private String emoji;
    private String title;

    public static SurveyBucketInfoDto of(PublicBucket publicBucket) {
        SurveyBucketInfoDto dto = new SurveyBucketInfoDto();
        dto.seq = publicBucket.getSeq();
        dto.emoji = publicBucket.getEmoji();
        dto.title = publicBucket.getTitle();
        return dto;
    }
}
