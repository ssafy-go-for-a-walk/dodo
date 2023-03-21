package com.ssafy.dodo.auth;

import com.ssafy.dodo.entity.AuthProvider;
import com.ssafy.dodo.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;

    // 여기부터 가져올 정보들을 나열한다.
    private String email;
    private String profileImage;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String email, String profileImage) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
        this.profileImage = profileImage;
    }

    public static OAuthAttributes of(String socialName, String userNameAttributeName, Map<String, Object> attributes){
        // 카카오
        if("kakao".equals(socialName)){
            return ofKakao("id", attributes);
        }

        return null;
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");

        return OAuthAttributes.builder()
                .email((String) kakaoAccount.get("email"))
                .profileImage((String) ((Map<String, Object>) kakaoAccount.get("profile")).get("thumbnail_image_url"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    // DB에 저장할 수 있게 엔티티화
    public User toEntity(String registrationId){
        return User.builder()
                .email(email)
                .profileImage(profileImage)
                .authProvider(AuthProvider.valueOf(registrationId.toUpperCase()))
                .build();
    }
}
