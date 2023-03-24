package com.ssafy.dodo.dto;

import com.ssafy.dodo.entity.User;
import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
public class UserInfoDto {

    private Long seq;
    private String email;
    private String nickname;
    private String profileImage;

    @Builder
    public UserInfoDto(Long seq, String email, String nickname, String profileImage) {
        this.seq = seq;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public static UserInfoDto of(User user) {
        return UserInfoDto.builder()
                .seq(user.getSeq())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();
    }
}
