package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.InitUserDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void updateUserInfo(Long userSeq, InitUserDto dto, MultipartFile profileImage);
    void initUserInfo(Long UserSeq, InitUserDto dto, MultipartFile profileImage);
}
