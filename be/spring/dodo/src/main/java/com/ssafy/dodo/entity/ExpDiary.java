package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exp_diaries")
@Getter
@ToString(exclude = {"addedBucket", "images"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE exp_diaries SET is_delete = true WHERE seq = ?")
public class ExpDiary extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private AddedBucket addedBucket;

    @OneToMany(mappedBy = "expDiary", fetch = FetchType.LAZY)
    private List<ExpDiaryImage> images = new ArrayList<>();

    private boolean isDelete;


    @Builder
    public ExpDiary(Long seq, String content, AddedBucket addedBucket, boolean isDelete) {
        this.seq = seq;
        this.content = content;
        this.addedBucket = addedBucket;
        this.isDelete = isDelete;
    }
}
