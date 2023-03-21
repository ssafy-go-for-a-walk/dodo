package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exp_diaries")
@Getter
@ToString(exclude = {"addedBucket", "images"})
@NoArgsConstructor
public class ExpDiary extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private AddedBucket addedBucket;

    @OneToMany(mappedBy = "expDiary", fetch = FetchType.LAZY)
    private List<ExpDiaryImage> images = new ArrayList<>();

    @Builder
    public ExpDiary(Long seq, String content) {
        this.seq = seq;
        this.content = content;
    }
}
