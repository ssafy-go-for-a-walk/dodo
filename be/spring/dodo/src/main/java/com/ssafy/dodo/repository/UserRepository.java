package com.ssafy.dodo.repository;

import com.ssafy.dodo.dto.UserInfoDto;
import com.ssafy.dodo.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("select new com.ssafy.dodo.dto.UserInfoDto(u.seq, u.email, u.nickname, u.profileImage, bl.seq, bl.title) from User u " +
            "join BucketListMember bm on u = bm.user " +
            "join bm.bucketList bl " +
            "where u.seq = :userSeq " +
            "order by bl.createdAt")
    List<UserInfoDto> findUserInfoBySeq(@Param("userSeq") Long userSeq, Pageable pageable);
}
