package com.ssafy.dodo.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@ToString(exclude = {"profileImage", "refreshToken"})
public class User extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String nickname;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
    private LocalDateTime lastLoginAt;
    private String refreshToken;
}
