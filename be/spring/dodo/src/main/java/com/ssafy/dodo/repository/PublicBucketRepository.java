package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.PublicBucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicBucketRepository extends JpaRepository<PublicBucket, Long> {
}
