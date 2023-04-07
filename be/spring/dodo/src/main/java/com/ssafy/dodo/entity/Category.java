package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Getter
@ToString
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE categories SET is_delete = true WHERE seq = ?")
public class Category extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String item;

    private boolean isDelete;

    @Builder
    public Category(Long seq, String item, boolean isDelete) {
        this.seq = seq;
        this.item = item;
        this.isDelete = isDelete;
    }
}
