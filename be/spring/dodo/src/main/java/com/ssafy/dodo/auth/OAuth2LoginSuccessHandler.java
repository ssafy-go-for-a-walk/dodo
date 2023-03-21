package com.ssafy.dodo.auth;

import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        try{
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // TODO JWT 처리 추가

            User user = saveOrUpdateUser("", oAuth2User);

            // 로그인 실패가 발생했을 때 세션에 저장된 에러를 지운다.
            clearAuthenticationAttrubutes(request, response);

            String targetUrl;

            if(user.getNickname() == null){
                // 추가정보 입력 페이지로
                targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/guest").toUriString();
            }else{
                // 홈으로
                targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/home").toUriString();
            }

            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        }catch(Exception e){
            throw e;
        }

    }

    private void clearAuthenticationAttrubutes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
    }

    private User saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {

        Optional<User> optionalUser = userRepository.findByEmail(oAuth2User.getEmail());
        User user;

        if(optionalUser.isEmpty()){ // 없으면 저장
            user = User.builder()
                    .email(oAuth2User.getEmail())
                    .refreshToken(refreshToken)
                    .build();
        }else{ // 있으면 가져와서 리프레시 토큰만 업데이트
            user = optionalUser.get();
//            user.updateRefreshToken(refreshToken);
        }

        return userRepository.save(user);
    }
}
