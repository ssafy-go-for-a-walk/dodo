package com.ssafy.dodo.entity;

import java.io.Serializable;
import java.util.Objects;

public class BookmarkSeq implements Serializable {

    private Long userSeq;
    private Long bucketListSeq;

    @Override
    public int hashCode() {
        return Objects.hash(userSeq, bucketListSeq);
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;
        BookmarkSeq bookmarkSeq = (BookmarkSeq) obj;
        return Objects.equals(this.userSeq, bookmarkSeq.userSeq)
                && Objects.equals(this.bucketListSeq, bookmarkSeq.bucketListSeq);
    }
}
