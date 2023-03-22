package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Getter
@ToString
@NoArgsConstructor
public class Category extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String item;

    @Builder
    public Category(Long seq, String item) {
        this.seq = seq;
        this.item = item;
    }
}
