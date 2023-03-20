package com.ssafy.dodo.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "bucketlist_members")
@IdClass(BucketListMemberSeq.class)
@Getter
public class BucketListMember {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;
}
