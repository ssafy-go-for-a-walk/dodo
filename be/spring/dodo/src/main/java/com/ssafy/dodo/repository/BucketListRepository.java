package com.ssafy.dodo.repository;

import com.ssafy.dodo.dto.SimpleBucketListDto;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BucketListRepository extends JpaRepository<BucketList, Long> {

    @Query("select new com.ssafy.dodo.dto.SimpleBucketListDto(bl.seq, bl.title, sum(ab.isComplete)/count(ab.seq)*100.0, bl.type) " +
            "from BucketList bl " +
            "join AddedBucket ab on ab.bucketList = bl " +
            "join BucketListMember bm on bm.bucketList = bl " +
            "where bm.user = :user " +
            "group by bl")
    List<SimpleBucketListDto> getBucketListByUserWithCompleteRate(@Param("user") User user);
}
