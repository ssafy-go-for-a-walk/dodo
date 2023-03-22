package com.ssafy.dodo.controller;

import com.ssafy.dodo.auth.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

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
}
