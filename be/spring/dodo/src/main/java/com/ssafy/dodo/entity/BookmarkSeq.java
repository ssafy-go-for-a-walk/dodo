package com.ssafy.dodo.entity;

import java.io.Serializable;
import java.util.Objects;

public class BookmarkSeq implements Serializable {

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
        BookmarkSeq bookmarkSeq = (BookmarkSeq) obj;
        return Objects.equals(this.user, bookmarkSeq.user)
                && Objects.equals(this.bucketList, bookmarkSeq.bucketList);
    }
}
