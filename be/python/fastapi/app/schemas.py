from datetime import datetime
from pydantic import BaseModel

from models import AuthProvider
from models import BucketListType

class User(BaseModel):
    seq: int
    email: str
    nickname: str
    profile_image: str
    auth_provider: AuthProvider
    last_login_at: datetime
    refresh_token: str
    is_delete: int


class BucketList(BaseModel):
    seq: int
    title: str
    image: str
    is_public: bool
    type: BucketListType
    is_delete: int


class Category(BaseModel):
    seq: int
    item: str
    is_delete: int


class PublicBucket(BaseModel):
    seq: int
    emoji: str
    title: str
    is_public: bool
    added_count: int
    is_delete: int

    category_seq: int


class AddedBucket(BaseModel):
    seq: int
    is_complete: bool
    emoji: str
    d_day: str
    location: str
    desc: str
    is_delete: int

    bucketlist_seq: int
    bucket_seq: int


class ExpDiary(BaseModel):
    seq: int
    content: str
    is_delete: int

    bucket_seq: int


class DiaryImage(BaseModel):
    seq: int
    path: str
    original_name: str
    is_delete: int

    exp_diary_seq: int


class Bookmark(BaseModel):
    user_seq: int
    bucketlist_seq: int
    is_delete: int


class BucketListMember(BaseModel):
    seq: int
    user_seq: int
    is_delete: int
    bucketlist_seq: int


