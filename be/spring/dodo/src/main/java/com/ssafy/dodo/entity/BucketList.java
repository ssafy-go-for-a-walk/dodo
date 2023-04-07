package com.ssafy.dodo.entity;

import com.ssafy.dodo.util.RandomStringTokenCreator;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "bucketlists")
@Getter
@ToString
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE bucketlists SET is_delete = true WHERE seq = ?")
@DynamicUpdate
public class BucketList extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String title;
    private String image;
    private boolean isPublic;

    @Enumerated(value = EnumType.STRING)
    private BucketListType type;

    private String shareToken;
    private boolean isDefault;
    private boolean isDelete;

    @Builder
    public BucketList(Long seq, String title, String image, boolean isPublic, BucketListType type, boolean isDefault) {
        this.seq = seq;
        this.title = title;
        this.image = image;
        this.isPublic = isPublic;
        this.type = type;
        this.isDefault = isDefault;
        this.shareToken = RandomStringTokenCreator.create();
    }

    public BucketList(Long seq, String title, String image, boolean isPublic, BucketListType type, boolean isDefault, boolean isDelete) {
        this.seq = seq;
        this.title = title;
        this.image = image;
        this.isPublic = isPublic;
        this.type = type;
        this.isDefault = isDefault;
        this.isDelete = isDelete;
    }

    public void updateBucketListInfo(String title, boolean isPublic){
        this.title = title;
        this.image = image;
        this.isPublic = isPublic;
    }

    public void updateBucketListImage(String image){
        this.image = image;
    }

    public void updateShareToken(String shareToken) {
        this.shareToken = shareToken;
    }
}
