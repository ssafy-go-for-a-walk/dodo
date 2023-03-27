package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.BucketListMember;
import com.ssafy.dodo.entity.BucketListMemberSeq;
import com.ssafy.dodo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketListMemberRepository extends JpaRepository<BucketListMember, BucketListMemberSeq> {

    Boolean existsByUserAndBucketList(User user, BucketList bucketList);
}
