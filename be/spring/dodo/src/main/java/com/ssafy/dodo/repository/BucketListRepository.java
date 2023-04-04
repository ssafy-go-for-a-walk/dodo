package com.ssafy.dodo.repository;

import com.ssafy.dodo.dto.SimpleBucketListDto;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BucketListRepository extends JpaRepository<BucketList, Long> {

    @Query("select new com.ssafy.dodo.dto.SimpleBucketListDto(" +
            "bl.seq, bl.title, sum(case when ab.isComplete = true then 1 else 0 end) / count(ab.seq) * 100.0, bl.type) " +
            "from BucketList bl " +
            "left outer join AddedBucket ab on ab.bucketList = bl " +
            "join BucketListMember bm on bm.bucketList = bl " +
            "where bm.user = :user " +
            "group by bl")
    List<SimpleBucketListDto> getBucketListByUserWithCompleteRate(@Param("user") User user);

    Page<BucketList> findAllByIsPublic(boolean b, Pageable pageable);

    @Query("select sum(case when ab.isComplete = true then 1 else 0 end) / count(ab.seq) * 100.0 from BucketList bl " +
            "join AddedBucket ab on ab.bucketList = bl " +
            "where bl = :bucketList")
    Double getBucketListCompleteRate(@Param("bucketList") BucketList bucketList);

    @Query("SELECT COUNT(*) FROM BucketList bl join BucketListMember bm on bm.bucketList = bl WHERE bm.user = :user")
    int countByUser(User user);

    @Query("select bl from BucketList bl " +
            "join BucketListMember bm on bm.bucketList = bl " +
            "where bm.user = :user and bl.isDefault = true")
    Optional<BucketList> findDefaultBucketListByUser(@Param("user") User user);

    @Query("select bl from BucketList bl " +
            "join BucketListMember bm on bm.bucketList = bl " +
            "where bm.user.seq = :userSeq and bm.bucketList.seq = :bucketListSeq")
    Optional<BucketList> findByUserSeqAndBucketListSeq(@Param("userSeq") Long userSeq,
                                                       @Param("bucketListSeq") Long bucketListSeq);
}
