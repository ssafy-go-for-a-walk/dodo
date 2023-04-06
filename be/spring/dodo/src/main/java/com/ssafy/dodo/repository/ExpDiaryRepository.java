package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.ExpDiary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpDiaryRepository extends JpaRepository<ExpDiary, Long> {

    @Query(value = "select ed from ExpDiary ed " +
            "join fetch ed.addedBucket ab " +
            "join fetch ab.publicBucket pb " +
            "left outer join fetch pb.category c " +
//            "left outer join fetch ed.images edi " +
            "where ab = :addedBucket " +
            "order by ed.createdAt desc",
            countQuery = "select count(*) from ExpDiary ed where ed.addedBucket = :addedBucket")
    Page<ExpDiary> findAllByAddedBucket(@Param("addedBucket") AddedBucket addedBucket, Pageable pageable);

    @Query(value = "select ed from ExpDiary ed " +
            "join fetch ed.addedBucket ab " +
            "join fetch ab.bucketList bl " +
            "join fetch ab.publicBucket pb " +
            "left outer join fetch pb.category " +
            "left outer join fetch ed.images " +
            "where bl = :bucketlist " +
            "order by ed.createdAt desc",
            countQuery = "select count(*) from ExpDiary ed " +
                    "join ed.addedBucket ab " +
                    "where ab.bucketList = :bucketlist")
    Page<ExpDiary> findAllByBucketList(@Param("bucketlist") BucketList bucketList, Pageable pageable);
}
