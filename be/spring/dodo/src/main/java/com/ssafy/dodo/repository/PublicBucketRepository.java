package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.PublicBucket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PublicBucketRepository extends JpaRepository<PublicBucket, Long> {

    @Modifying(clearAutomatically = true)
    @Query("UPDATE PublicBucket pb SET pb.addedCount = pb.addedCount + 1 WHERE pb IN :publicBuckets")
    void plusAddedCount(List<PublicBucket> publicBuckets);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE PublicBucket pb SET pb.addedCount = pb.addedCount - 1 WHERE pb IN :publicBuckets")
    void minusAddedCount(List<PublicBucket> publicBuckets);
}
