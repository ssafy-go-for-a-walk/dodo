package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Preference;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    @Modifying
    @Query("UPDATE Preference p SET p.isDelete = true WHERE p.user = :user AND p.publicBucket in :publicBuckets")
    void deleteAllByUserAndPublicBucketIn(User user, List<PublicBucket> publicBuckets);

    @Modifying(flushAutomatically = true)
    void deleteAllByUserAndPublicBucket(User user, PublicBucket publicBucket);

    @Query("SELECT pb from Preference p " +
            "join p.publicBucket pb " +
            "where p.user = :user and p.seq not in :publicBucketSeq")
    List<PublicBucket> findPublicBucketByUserAndNotInFrom(@Param("user") User user, @Param("publicBucketSeq") List<Long> publicBucketSeq);
}
