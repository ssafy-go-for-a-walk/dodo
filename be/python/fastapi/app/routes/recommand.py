import logging
from fastapi import Depends, APIRouter, Header
from sqlalchemy.orm import Session, join
from sqlalchemy.sql import text
from config import conn
from database.models import Category, Preference, PublicBucket
from auth.auth_handler import decodeJWT
from typing import Optional
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import pandas as pd

router = APIRouter()

engine = conn()

# logging
logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

# @router.get('/test')
def session_test(db):
	example = db.query(Category).all()
	return example

# Preference - title을 활용한 CBF - 코사인 유사도 활용
@router.get("/buckets")
def bucket_recommand(category: str, skip: int = 0, limit: int = 10,
		    db: Session = Depends(engine.get_session), 
	      Authorization: Optional[str] = Header("None")):
	
	logger.info(category)
	# logger.info(Authorization)
	token = decodeJWT(Authorization.split(' ')[1])
	user_seq=token['userSeq']
	logger.info(f"LOGIN 정보: {user_seq}")

	# 유저가 몇명 이상이면 협업 필터링을 해야할까?
	# 너무 느린데.. 카테고리 별로 나눠서 해보기

	prefer_data = db.query(Preference).filter(Preference.user_seq == user_seq).all()
	data = db.query(PublicBucket).filter(PublicBucket.is_public == 0).all()

	# print(pre[1].publicBucket.title)
	# print(pre[1].user.nickname)
	# print(data[0].title)
	
	# okt = Okt()
	# contents = list(map(lambda x: x.title, data))
	
	# # print(contents)

	# vocab = []
	# for content in contents:
	# 	vocab += okt.nouns(content)

	# # print(vocab)

	# vocab = list(set(vocab))

	# stop_words=['하기']
	# vocab = list(filter(lambda x: x not in stop_words, vocab))
	
	# # print(vocab)

	# tfidf = TfidfVectorizer()
	# tfidf_matrix = tfidf.fit_transform(vocab)
	# print(tfidf_matrix.shape)

	# consine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

	# print(consine_sim)
	# print(consine_sim[::-1])

	# indices = pd.Series(vocat)
	
	return data[0] # 나중에 추천된 목록 리턴하기