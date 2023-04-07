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

    // 선호도에 이미 저장된 퍼블릭 버킷리스트를 제외한 버킷리스트 조회
    @Query("select pb from PublicBucket pb " +
            "where pb.seq in :publicBucketSeq and pb.seq not in " +
            "(select p.publicBucket.seq from Preference p where p.user = :user)")
    List<PublicBucket> findPublicBucketByUserAndNotIn(@Param("user") User user, @Param("publicBucketSeq") List<Long> publicBucketSeq);
}
