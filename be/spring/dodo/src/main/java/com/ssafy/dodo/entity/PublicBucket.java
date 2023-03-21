package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "public_buckets")
@Getter
@ToString(exclude = {"category"})
@NoArgsConstructor
public class PublicBucket extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String emoji;
    private String title;
    private boolean isPublic;
    private Long addedCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_seq")
    private Category category;

    @Builder
    public PublicBucket(Long seq, String emoji, String title, boolean isPublic, Long addedCount) {
        this.seq = seq;
        this.emoji = emoji;
        this.title = title;
        this.isPublic = isPublic;
        this.addedCount = addedCount;
    }
}
