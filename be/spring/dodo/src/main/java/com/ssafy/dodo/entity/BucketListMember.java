package com.ssafy.dodo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "bucketlist_members")
@IdClass(BucketListMemberSeq.class)
@Getter
@NoArgsConstructor
public class BucketListMember extends BaseEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;
}
