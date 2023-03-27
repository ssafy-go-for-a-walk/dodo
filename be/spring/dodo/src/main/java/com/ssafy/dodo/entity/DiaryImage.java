package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "diary_images")
@Getter
@ToString(exclude = {"expDiary"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE diary_images SET is_delete = true WHERE seq = ?")
public class DiaryImage extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String path;
    private String originalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_seq")
    private ExpDiary expDiary;

    private boolean isDelete;


    @Builder
    public DiaryImage(Long seq, String path, String originalName, ExpDiary expDiary, boolean isDelete) {
        this.seq = seq;
        this.path = path;
        this.originalName = originalName;
        this.expDiary = expDiary;
        this.isDelete = isDelete;
    }
}
