package com.ssafy.dodo.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@ToString(exclude = {"profileImage", "refreshToken"})
@NoArgsConstructor
public class User extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String email;
    private String nickname;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
    private LocalDateTime lastLoginAt;
    private String refreshToken;

    @Builder
    public User(Long seq, String email, String nickname, String profileImage, AuthProvider authProvider, LocalDateTime lastLoginAt, String refreshToken) {
        this.seq = seq;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.authProvider = authProvider;
        this.lastLoginAt = LocalDateTime.now();
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
