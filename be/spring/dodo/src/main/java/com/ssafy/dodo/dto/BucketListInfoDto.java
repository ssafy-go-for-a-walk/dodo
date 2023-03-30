package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.BucketListType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BucketListInfoDto {

    private Long seq;
    private String title;
    private String image;
    private BucketListType type;
    private Boolean isPublic;

    public BucketListInfoDto(BucketList bucketList) {
        this.seq = bucketList.getSeq();
        this.title = bucketList.getTitle();
        this.image = bucketList.getImage();
        this.type = bucketList.getType();
        this.isPublic = bucketList.isPublic();
    }
}
