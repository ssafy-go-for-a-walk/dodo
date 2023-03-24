package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Preference;
import com.ssafy.dodo.entity.PublicBucket;
import com.ssafy.dodo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    @Modifying
    @Query("UPDATE Preference p SET p.isDelete = true WHERE p.user = :user AND p.publicBucket in :publicBuckets")
    void deleteAllByUserAndPublicBucketIn(User user, List<PublicBucket> publicBuckets);
}
