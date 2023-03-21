package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "added_buckets")
@Getter
@ToString(exclude = {"bucketList", "publicBucket"})
@NoArgsConstructor
public class AddedBucket extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private boolean isComplete;
    private String emoji;
    private String dDay;
    private String location;
    private String desc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private PublicBucket publicBucket;

    @Builder
    public AddedBucket(Long seq, boolean isComplete, String emoji, String dDay, String location, String desc) {
        this.seq = seq;
        this.isComplete = isComplete;
        this.emoji = emoji;
        this.dDay = dDay;
        this.location = location;
        this.desc = desc;
    }
}
