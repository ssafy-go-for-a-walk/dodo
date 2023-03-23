package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "preferences")
@Getter
@ToString(exclude = {"user", "publicBucket"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE preferences SET is_delete = true WHERE seq = ?")
public class Preference extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private PublicBucket publicBucket;

    private boolean isDelete;

    @Builder
    public Preference(Long seq, User user, PublicBucket publicBucket, boolean isDelete) {
        this.seq = seq;
        this.user = user;
        this.publicBucket = publicBucket;
        this.isDelete = isDelete;
    }
}
