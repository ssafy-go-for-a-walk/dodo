import json

from sqlalchemy import (Column, ForeignKey, BIGINT, VARCHAR,TEXT, DATETIME, JSON, PrimaryKeyConstraint) 
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT
from enum import Enum
from sqlalchemy.ext.declarative import declarative_base

# 데이터 모델 구성을 위한 클래스
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    email = Column(VARCHAR(255), nullable=False)
    nickname = Column(VARCHAR(30), nullable=True)
    profile_image = Column(VARCHAR(255), nullable=False)
    auth_provider = Column(VARCHAR(10), nullable=False)
    last_login_at = Column(DATETIME, nullable=True)
    refresh_token = Column(VARCHAR(255), nullable=True)
    is_delete = Column(TINYINT, nullable=False, default=0)
    

class BucketList(Base):
    __tablename__ = "bucketlists"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    title = Column(VARCHAR(100), nullable=False)
    image = Column(VARCHAR(255), nullable=False)
    is_public = Column(TINYINT, default=0, nullable=False)
    type = Column(VARCHAR(10), nullable=False)
    is_delete = Column(TINYINT, nullable=False, default=0)


class Category(Base):
    __tablename__ = "categories"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    item = Column(VARCHAR(50), nullable=False)
    is_delete = Column(TINYINT, nullable=False, default=0)


class PublicBucket(Base):
    __tablename__ = "public_buckets"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    emoji = Column(VARCHAR(100), nullable=True)
    title = Column(VARCHAR(100), nullable=False)
    is_public = Column(TINYINT, nullable=False, default=0)
    added_count = Column(BIGINT, nullable=False, default=1)
    is_delete = Column(TINYINT, nullable=False, default=0)

    category_seq = Column(BIGINT, ForeignKey("categories.seq"))


class AddedBucket(Base):
    __tablename__ = "added_buckets"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    is_complete = Column(TINYINT, nullable=False)
    emoji = Column(VARCHAR(100), nullable=True)
    d_day = Column(VARCHAR(100), nullable=False)
    location = Column(VARCHAR(255), nullable=True)
    desc = Column(TEXT, nullable=True)
    is_delete = Column(TINYINT, nullable=False, default=0)

    bucketlist_seq = Column(BIGINT, ForeignKey('bucketlists.seq'))
    bucket_seq = Column(BIGINT, ForeignKey("public_buckets.seq"))

    # 이렇게 해야하는지는 고민중
    bucketLists = relationship("BucketList")

class ExpDiary(Base):
    __tablename__ = "exp_diaries"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    content = Column(TEXT, nullable=False)
    is_delete = Column(TINYINT, nullable=False, default=0)

    bucket_seq = Column(BIGINT, ForeignKey("added_buckets.seq"))

    # 양방향
    # diaryImages = relationship("DiaryImage", back_populates="expDiaries")
    diaryImages = relationship("DiaryImage", backref="exp_diaries")


class DiaryImage(Base):
    __tablename__ = "diary_images"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    path = Column(VARCHAR(255), nullable=False)
    original_name = Column(VARCHAR(255), nullable=False)
    is_delete = Column(TINYINT, nullable=False, default=0)

    exp_diary_seq = Column(BIGINT, ForeignKey("exp_diaries.seq"))
    
    # 양방향
    # expDiaries = relationship("ExpDiary", back_populates="diaryImages")
       
class Bookmark(Base):
    __tablename__ = "bookmarks"
    
    # 복합키 설정
    __table_args__ = (PrimaryKeyConstraint("user_seq", "bucketlist_seq", name = "bookmark_id"), )
    user_seq = Column(BIGINT, ForeignKey("users.seq"))
    bucketlist_seq = Column(BIGINT, ForeignKey("bucketlists.seq"))
    is_delete = Column(TINYINT, nullable=False, default=0)


class BucketListMember(Base):
    __tablename__ = "bucketlist_members"

    __table_args__ = (PrimaryKeyConstraint("user_seq", "bucketlist_seq", name = "bucketlist_mamber_id"), )
    user_seq = Column(BIGINT, ForeignKey("users.seq"))
    bucketlist_seq = Column(BIGINT, ForeignKey("bucketlists.seq"))
    is_delete = Column(TINYINT, nullable=False, default=0)


class Preference(Base):
    __tablename__= "preferences"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    user_seq = Column(BIGINT, ForeignKey("users.seq"))
    bucket_seq = Column(BIGINT, ForeignKey("public_buckets.seq"))
    is_delete = Column(TINYINT, nullable=False, default=0)

    publicBucket = relationship("PublicBucket", backref="preferences")
    user = relationship("User", backref="users")


# enum
class AuthProvider(str, Enum) :
    LOCAL = "LOCAL", 
    KAKAO = "KAKAO",
    NAVER = "NAVER", 
    GOOGLE = "GOOGLE"

class BucketListType(str, Enum) :
    SINGLE = "SINGLE", 
    GROUP = "GROUP"