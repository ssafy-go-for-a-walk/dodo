package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "added_buckets")
@Getter
@ToString
@NoArgsConstructor
public class AddedBucket {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private boolean isComplete;
    private String emoji;
    private String dDay;
    private String location;
    private String desc;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "bucketlist_seq")
    private BucketList bucketList;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "bucket_seq")
    private PublicBucket publicBucket;
}
