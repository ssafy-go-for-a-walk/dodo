import json

class Test_dto:
    seq: int
    item: str

    def __init__(self, seq, item):
        self.seq = seq
        self.item = item
        
class User_dto:
    nickname: str
    image: str

    def __init__(self, nickname, image):
        self.nickname = nickname
        self.image = image

    def __str__(self) -> str:
        return "user: {0}, {1}".format(self.nickname, self.image)


class Bucketlist_dto:
    title: str
    image: str

    def __init__(self, title, image):
        self.title = title
        self.image = image
    
    def __str__(self) -> str:
        return "bucketlist: {0}, {1}".format(self.title, self.image)


class Bucket_dto:
    title: str
    emoji: str
    category: str

    def __init__(self, title, emoji, category) -> None:
        self.title = title 
        self.emoji = emoji
        self.category = category

    def __str__(self) -> str:
        return "bucket: {0}, {1}, {2}".format(self.title, self.emoji, self.category)

class User_recoomm_dto:
    user: User_dto
    bucketlist: Bucketlist_dto
    buckets: list

    def __init__(self, user, bucketlist, buckets):
        self.user = user
        self.bucketlist = bucketlist
        self.buckets = buckets

    def __str__(self) -> str:
        return "user recomm: {0}, {1}, {2}".format(self.user, self.bucketlist, self.buckets)


class Category_dto:
    seq: int
    item: str

    def __init__(self, seq, item):
        self.seq = seq
        self.item = item
        
    def __str__(self) -> str:
        return "category: {0}, {1}".format(self.seq, self.item)

class Bucket_recoomm_dto:
    title: str
    emoji: str
    addedCount: int
    publicBucketSeq: int
    isAdded: bool
    category: Category_dto

    def __init__(self, title, emnoji, addedCount, publicBucketSeq, isAdded, category):
        self.title = title
        self.emoji = emnoji
        self.addedCount = addedCount
        self.publicBucketSeq = publicBucketSeq
        self.isAdded = isAdded
        self.category = category

    def __str__(self) -> str:
        return "Bucket_recomm : {0}, {1}, {2}, {3}, {4}, {5}".format(self.title, self.emoji, self.addedCount, self.publicBucketSeq, self.isAdded, self.category)
