package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "public_buckets")
@Getter
@ToString(exclude = {"category"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE public_buckets SET is_delete = true WHERE seq = ?")
@DynamicUpdate
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

    private boolean isDelete;

    public void updateCategory(Category category){
        this.category = category;
    }

    @Builder
    public PublicBucket(Long seq, String emoji, String title, boolean isPublic, Long addedCount, Category category, boolean isDelete) {
        this.seq = seq;
        this.emoji = emoji;
        this.title = title;
        this.isPublic = isPublic;
        this.addedCount = addedCount;
        this.category = category;
        this.isDelete = isDelete;
    }
}
