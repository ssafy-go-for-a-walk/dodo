package com.ssafy.dodo.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class InitUserDto {

    String nickname;
    List<Long> preferenceBuckets;
}
