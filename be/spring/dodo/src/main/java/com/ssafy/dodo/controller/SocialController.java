package com.ssafy.dodo.controller;

import com.ssafy.dodo.dto.DataResponse;
import com.ssafy.dodo.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/social")
public class SocialController {

    private final SocialService socialService;

    @GetMapping("/bucketlists")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> getSocialBucketLists(Pageable pageable,
                                                @AuthenticationPrincipal UserDetails userDetails){
        return new DataResponse<>(socialService.getSocialBucketLists(pageable, userDetails));
    }
}
