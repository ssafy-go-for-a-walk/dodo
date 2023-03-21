package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "exp_diary_images")
@Getter
@ToString(exclude = {"expDiary"})
@NoArgsConstructor
public class ExpDiaryImage extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String path;
    private String originalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exp_diary_seq")
    private ExpDiary expDiary;

    @Builder
    public ExpDiaryImage(Long seq, String path, String originalName) {
        this.seq = seq;
        this.path = path;
        this.originalName = originalName;
    }
}
