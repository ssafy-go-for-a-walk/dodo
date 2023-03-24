package com.ssafy.dodo.service;

public interface AuthService {
    String reissueAccessToken(String oldAccessToken, String refreshToken);
}
