package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "public_buckets")
@Getter
@ToString
public class PublicBucket {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String emoji;
    private String title;
    private boolean isPublic;
    private Long addedCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_seq")
    private Category category;
}
