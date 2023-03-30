package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.BucketList;
import com.ssafy.dodo.entity.PublicBucket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddedBucketRepository extends JpaRepository<AddedBucket, Long> {

    @Query("select ab from AddedBucket ab " +
            "join fetch ab.publicBucket pb " +
            "join fetch pb.category")
    List<AddedBucket> findAllByBucketList(BucketList bucketList);

    @Modifying
    @Query("UPDATE AddedBucket ab SET ab.isDelete = true WHERE ab.bucketList = :bucketList")
    void deleteByBucketList(BucketList bucketList);

    boolean existsByBucketListAndPublicBucket(BucketList bucketList, PublicBucket publicBucket);

    int countByBucketListAndIsComplete(BucketList bucketList, boolean isComplete);

    int countByBucketList(BucketList bucketList);
}
