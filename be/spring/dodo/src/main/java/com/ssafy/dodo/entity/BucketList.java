package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "bucketlists")
@Getter
@ToString
public class BucketList {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String title;
    private String image;
    private boolean isPublic;

    @Enumerated(value = EnumType.STRING)
    private BucketListType type;
}
