package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "added_buckets")
@Getter
@ToString(exclude = {"bucketList", "publicBucket"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE added_buckets SET is_delete = true WHERE seq = ?")
@DynamicUpdate
public class AddedBucket extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private boolean isComplete;
    private String emoji;
    private LocalDate dDay;
    private String location;
    private String desc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private PublicBucket publicBucket;

    private boolean isDelete;

    @Builder
    public AddedBucket(Long seq, boolean isComplete, String emoji, LocalDate dDay, String location, String desc, BucketList bucketList, PublicBucket publicBucket, boolean isDelete) {
        this.seq = seq;
        this.isComplete = isComplete;
        this.emoji = emoji;
        this.dDay = dDay;
        this.location = location;
        this.desc = desc;
        this.bucketList = bucketList;
        this.publicBucket = publicBucket;
        this.isDelete = isDelete;
    }

    public void updateBucketInfo(String emoji, LocalDate dDay, String location, String desc) {
        this.emoji = emoji;
        this.dDay = dDay;
        this.location = location;
        this.desc = desc;
    }

    public void completeToggleBucket() {
        this.isComplete = this.isComplete ? false : true;
    }
}
