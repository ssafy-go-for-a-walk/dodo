package com.ssafy.dodo.controller;

import com.ssafy.dodo.auth.CustomOAuth2User;
import com.ssafy.dodo.service.AuthService;
import com.ssafy.dodo.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.attribute.UserPrincipal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/hello")
    public String hello(@AuthenticationPrincipal UserDetails userDetails){
        /*
        log.info(userDetails.getUsername()); // 3
        log.info(userDetails.toString()); // org.springframework.security.core.userdetails.User [Username=3, Password=[PROTECTED], Enabled=true, AccountNonExpired=true, credentialsNonExpired=true, AccountNonLocked=true, Granted Authorities=[ROLE_USER]]
         */
        return "hello";
    }

    @GetMapping("/bye")
    public String bye(){
        return "bye";
    }

    @GetMapping("/reissue")
    public String reissueAccessToken(HttpServletRequest request,
                                     @RequestHeader("Authorization") String oldAccessToken,
                                     @AuthenticationPrincipal UserDetails authUser){
        oldAccessToken = oldAccessToken.substring(7);

        String refreshToken = SecurityUtil.getCookie(request, "refresh")
                .orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
                .getValue();

        log.info("refreshToken : {}", refreshToken);

        String newAccessToken = authService.reissueAccessToken(oldAccessToken, refreshToken);

        return newAccessToken;
    }

}
