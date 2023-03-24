package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.BucketListMember;
import com.ssafy.dodo.entity.BucketListMemberSeq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketListMemberRepository extends JpaRepository<BucketListMember, BucketListMemberSeq> {
}
