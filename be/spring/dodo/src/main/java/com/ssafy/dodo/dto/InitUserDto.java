package com.ssafy.dodo.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class InitUserDto {

    String nickname;
    List<Long> preferenceBuckets = new ArrayList<>();
}
