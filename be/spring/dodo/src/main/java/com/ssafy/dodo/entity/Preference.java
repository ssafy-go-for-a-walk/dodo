package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "preferences")
@Getter
@ToString(exclude = {"user", "publicBucket"})
@NoArgsConstructor
public class Preference extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private PublicBucket publicBucket;

    @Builder
    public Preference(Long seq, User user) {
        this.seq = seq;
        this.user = user;
    }
}
