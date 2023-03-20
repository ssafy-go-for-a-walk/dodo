package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "bookmarks")
@IdClass(BookmarkSeq.class)
@Getter
@ToString
public class Bookmark {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;
}
