import json

from sqlalchemy import (
    Column, 
    ForeignKey, 
    Integer, 
    BIGINT, 
    VARCHAR,
    TEXT, 
    BOOLEAN, 
    DATETIME, 
    JSON
) 
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT
from enum import Enum

from .database import Base

class User(Base):
    __tablename__ = "users"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    email = Column(VARCHAR(255), nullable=False)
    nickname = Column(VARCHAR(30), nullable=False)
    profile_image = Column(VARCHAR(255), nullable=False)
    auth_provider = Column(VARCHAR(10), nullable=False)
    last_login_at = Column(DATETIME, nullable=True)
    refresh_token = Column(VARCHAR(255), nullable=True)

class Bucketlist(Base):
    __tablename__ = "bucketlists"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    title = Column(VARCHAR(100), nullable=False)
    image = Column(VARCHAR(255), nullable=False)
    is_public = Column(TINYINT, default=0, nullable=False)
    type = Column(VARCHAR(10), nullable=False)

class Category(Base):
    __tablename__ = "categories"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    item = Column(VARCHAR(50), nullable=False)

class PublicBuckets(Base):
    __tablename__ = "public_buckets"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    emoji = Column(VARCHAR(100), nullable=True)
    title = Column(VARCHAR(100), nullable=False)
    is_public = Column(TINYINT, nullable=False, default=0)
    added_count = Column(BIGINT, nullable=False, default=1)

    categoires_seq = relationship("Category")

class AddedBuckets(Base):
    __tablename__ = "added_buckets"

    seq = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    is_complete = Column(TINYINT, nullable=False)
    emoji = Column(VARCHAR(100), nullable=True)
    d_day = Column(VARCHAR(100), nullable=False)
    location = Column(VARCHAR(255), nullable=True)
    desc = Column(TEXT, nullable=True)

# 경험일기 - 경험일기 이미지 양방향

# enum
class AuthProvider(str, Enum) :
    LOCAL = "LOCAL", 
    KAKAO = "KAKAO",
    NAVER = "NAVER", 
    GOOGLE = "GOOGLE"

class BucketListType(str, Enum) :
    SINGLE = "SINGLE", 
    GROUP = "GROUP"