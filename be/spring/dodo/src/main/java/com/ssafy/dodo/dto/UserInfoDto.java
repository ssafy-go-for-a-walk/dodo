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
    private boolean isFirstLogin;
    private DefaultBucketList defaultBucketList;


    @Builder
    public UserInfoDto(Long seq, String email, String nickname, String profileImage, Long defaultBucketListSeq, String defaultBucketListTitle) {
        this.seq = seq;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.isFirstLogin = nickname == null;
        this.defaultBucketList = new DefaultBucketList(defaultBucketListSeq, defaultBucketListTitle);
    }

    public static UserInfoDto of(User user) {
        return UserInfoDto.builder()
                .seq(user.getSeq())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();
    }

    @Getter
    @Setter
    @ToString
    @NoArgsConstructor
    public static class DefaultBucketList {
        Long seq;
        String title;
        Double completeRate;

        public DefaultBucketList(Long seq, String title) {
            this.seq = seq;
            this.title = title;
        }
    }
}
