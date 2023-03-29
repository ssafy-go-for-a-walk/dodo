package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@ToString
@RedisHash(value = "invitedBl", timeToLive = 60 * 30) // keyspace: invitedBl, 만료시간: 30분
public class InviteToken {

    @Id
    private String id;
    private Long bucketListSeq; // 초대한 버킷리스트 식별자
    private Long inviterSeq; // 초대자 유저 식별자
    private LocalDateTime createdAt;

    public InviteToken(String id, Long bucketListSeq, Long inviterSeq) {
        this.id = id;
        this.bucketListSeq = bucketListSeq;
        this.inviterSeq = inviterSeq;
        this.createdAt = LocalDateTime.now();
    }
}
