package com.ssafy.dodo.entity;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@ToString(exclude = {"profileImage", "refreshToken"})
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE users SET is_delete = true WHERE seq = ?")
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

    private boolean isDelete;

    @Builder
    public User(Long seq, String email, String nickname, String profileImage, AuthProvider authProvider, LocalDateTime lastLoginAt, String refreshToken, boolean isDelete) {
        this.seq = seq;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.authProvider = authProvider;
        this.lastLoginAt = lastLoginAt;
        this.refreshToken = refreshToken;
        this.isDelete = isDelete;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void initUserInfo(String nickname, String profileImage) {
        this.nickname = nickname;
        if (profileImage != null) {
            this.profileImage = profileImage;
        }
    }
}
