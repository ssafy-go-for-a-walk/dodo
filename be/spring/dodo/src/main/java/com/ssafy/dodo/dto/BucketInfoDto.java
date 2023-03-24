package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.PublicBucket;
import lombok.Getter;

import javax.persistence.*;

@Getter
public class BucketInfoDto {
    private String emoji;
    private String dDay;
    private String location;
    private String desc;
}
