package com.ssafy.dodo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddedBucketDto {
//    private Long addedBucketSeq;
//    private Long bucketListSeq;
//    private Long bucketSeq;
    private Long seq;
    private String title;
    private CategoryInfoDto category;
    private boolean isComplete;
    private String emoji;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dDay;
    private String location;
    private String desc;

//    @Builder
//    public AddedBucketDto(Long addedBucketSeq, Long bucketListSeq, Long bucketSeq, CategoryInfoDto category, boolean isComplete, String emoji, String dDay, String location, String desc) {
//        this.addedBucketSeq = addedBucketSeq;
//        this.bucketListSeq = bucketListSeq;
//        this.bucketSeq = bucketSeq;
//        this.category = category;
//        this.isComplete = isComplete;
//        this.emoji = emoji;
//        this.dDay = dDay;
//        this.location = location;
//        this.desc = desc;
//    }
}
