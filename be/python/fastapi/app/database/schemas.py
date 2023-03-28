from datetime import datetime
from pydantic import BaseModel

from database.models import AuthProvider
from database.models import BucketListType

from typing import Dict

class User_dto(BaseModel):
    seq: int
    email: str
    nickname: str
    profile_image: str
    auth_provider: AuthProvider
    last_login_at: datetime
    refresh_token: str
    is_delete: int


class BucketList_dto(BaseModel):
    seq: int
    title: str
    image: str
    is_public: bool
    type: BucketListType
    is_delete: int


class Category_dto(BaseModel):
    seq: int
    item: str
    is_delete: int

    class Config:
        orm_mode = True


class PublicBucket_dto(BaseModel):
    seq: int
    emoji: str
    title: str
    is_public: bool
    added_count: int
    is_delete: int

    category_seq: Category_dto


class AddedBucket_dto(BaseModel):
    seq: int
    is_complete: bool
    emoji: str
    d_day: str
    location: str
    desc: str
    is_delete: int

    bucketlist_seq: BucketList_dto
    bucket_seq: PublicBucket_dto


class ExpDiary_dto(BaseModel):
    seq: int
    content: str
    is_delete: int

    bucket_seq: AddedBucket_dto


class DiaryImage_dto(BaseModel):
    seq: int
    path: str
    original_name: str
    is_delete: int

    exp_diary_seq: ExpDiary_dto


class Bookmark_dto(BaseModel):
    user_seq: User_dto
    bucketlist_seq: BucketList_dto
    is_delete: int


class BucketListMember_dto(BaseModel):
    seq: int
    user_seq: User_dto
    bucketlist_seq: BucketList_dto
    is_delete: int


class Preference_dto(BaseModel):

    seq: int
    user_seq: User_dto
    bucket_seq: PublicBucket_dto
    is_delete: int

    