package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.AddedBucket;
import com.ssafy.dodo.entity.BucketList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AddedBucketRepository extends JpaRepository<AddedBucket, Long> {

    Page<AddedBucket> findAllByBucketList(BucketList bucketList, Pageable pageable);

    @Query("select ab from AddedBucket ab where ab.bucketList.seq = :bucketListSeq")
    List<AddedBucket> findAllByBucketList(@Param("bucketListSeq") Long bucketListSeq);

    void deleteAllByBucketList(Long bucketListSeq);
}
