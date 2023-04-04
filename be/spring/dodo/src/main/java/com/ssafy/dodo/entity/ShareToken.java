package com.ssafy.dodo.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@ToString
@RedisHash(value = "sharedBl") // keyspace: invitedBl
public class ShareToken {

    @Id
    private String id;

    private Long sharerSeq;
    private Long bucketListSeq; // 공유된 버킷리스트 식별자
    private String bucketListTitle;
    private LocalDateTime createdAt;

    @Builder
    public ShareToken(String id, Long sharerSeq, Long bucketListSeq, String bucketListTitle) {
        this.id = id;
        this.sharerSeq = sharerSeq;
        this.bucketListSeq = bucketListSeq;
        this.bucketListTitle = bucketListTitle;
        this.createdAt = LocalDateTime.now();
    }
}
