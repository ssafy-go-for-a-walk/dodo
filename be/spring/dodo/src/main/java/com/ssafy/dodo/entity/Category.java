package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Getter
@ToString(exclude = {"buckets"})
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String item;
}
