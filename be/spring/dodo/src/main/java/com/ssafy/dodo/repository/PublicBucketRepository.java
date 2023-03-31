package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Category;
import com.ssafy.dodo.entity.PublicBucket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Modifying()
    @Query("UPDATE PublicBucket pb SET pb.isPublic = 1 WHERE pb.seq IN :publicBuckets")
    void makePublicAllBySeqIn(List<Long> publicBuckets);

    @Modifying()
    @Query("UPDATE PublicBucket pb SET pb.isPublic = 0 WHERE pb.seq IN :publicBuckets")
    void makePrivateAllBySeqIn(List<Long> publicBuckets);

    List<PublicBucket> findAllBySeqIn(List<Long> publicBuckets);

    Page<PublicBucket> findAllByTitleContaining(String title, Pageable pageable);

    Page<PublicBucket> findAllByTitleContainingAndCategory(String title, Category category, Pageable pageable);

    Page<PublicBucket> findAll(Pageable pageable);
}
