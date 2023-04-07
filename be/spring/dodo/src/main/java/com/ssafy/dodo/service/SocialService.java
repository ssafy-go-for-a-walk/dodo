package com.ssafy.dodo.service;

import com.ssafy.dodo.dto.SocialBucketListsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

public interface SocialService {
    Page<SocialBucketListsDto> getSocialBucketLists(Pageable pageable, UserDetails userDetails);
}
