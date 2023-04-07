package com.ssafy.dodo.entity;

import java.io.Serializable;
import java.util.Objects;

public class BucketListMemberSeq implements Serializable {

    private Long user;
    private Long bucketList;

    @Override
    public int hashCode() {
        return Objects.hash(user, bucketList);
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;
        BucketListMemberSeq bucketListMemberSeq = (BucketListMemberSeq) obj;
        return Objects.equals(this.user, bucketListMemberSeq.user)
                && Objects.equals(this.bucketList, bucketListMemberSeq.bucketList);
    }
}
