package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.auth.CustomOAuth2User;
import com.ssafy.dodo.auth.jwt.JwtProvider;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.UserRepository;
import com.ssafy.dodo.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
//@Transactional
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public String reissueAccessToken(String oldAccessToken, String refreshToken) {

        if(!jwtProvider.validateToken(refreshToken)){
            throw new CustomException(ErrorCode.REFRESH_NOT_VALID);
        }

        Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);

        Long userSeq = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());

        User findUser = userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!refreshToken.equals(findUser.getRefreshToken())){
            throw new CustomException(ErrorCode.REFRESH_NOT_VALID);
        }

        return jwtProvider.createAccessToken(authentication);
    }
}
