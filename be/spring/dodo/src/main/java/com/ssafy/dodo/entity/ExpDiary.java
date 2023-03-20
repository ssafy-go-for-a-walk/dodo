package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exp_diaries")
@Getter
@ToString
public class ExpDiary {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_seq")
    private AddedBucket addedBucket;

    @OneToMany(mappedBy = "expDiary", fetch = FetchType.LAZY)
    private List<ExpDiaryImage> images = new ArrayList<>();
}
