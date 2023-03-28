package com.ssafy.dodo.auth;

import com.ssafy.dodo.auth.jwt.JwtProvider;
import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${app.auth.jwt.redirect-url}")
    private String ACCESS_TOKEN_REDIRECT_URL;

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_TYPE = "Bearer";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        try{
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            String accessToken = jwtProvider.createAccessToken(authentication);
            log.info("생성된 액세스토큰 {} ", accessToken);

            String refreshToken = jwtProvider.createRefreshToken(authentication);
            log.info("생성된 리프레쉬토큰 {} ", refreshToken);

            User user = saveOrUpdateUser(refreshToken, oAuth2User);

            ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                    .httpOnly(true)
                    .maxAge(jwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                    .path("/")
                    .build();

            // 로그인 실패가 발생했을 때 세션에 저장된 에러를 지운다.
            clearAuthenticationAttrubutes(request, response);

            response.addHeader("Set-Cookie", cookie.toString());

            String targetUrl = ACCESS_TOKEN_REDIRECT_URL + accessToken;

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
            user.updateRefreshToken(refreshToken);
            user.updateLastLogin(LocalDateTime.now());
        }

        return userRepository.save(user);
    }
}
