package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "exp_diary_images")
@Getter
@ToString
public class ExpDiaryImage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String path;
    private String originalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exp_diary_seq")
    private ExpDiary expDiary;
}
