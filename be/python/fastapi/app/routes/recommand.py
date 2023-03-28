import json
import random
import logging
import pandas as pd
from fastapi import Depends, APIRouter, Header, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from config import conn
from database.models import Category, Preference, PublicBucket, User
from auth.auth_handler import decodeJWT
from typing import Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

engine = conn()

security = HTTPBearer()

# logging
logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

@router.get('/test')
def session_test(db: Session = Depends(engine.get_session)):
	example = db.query(Category).all()
	return example


# Preference - title을 활용한 CBF - 코사인 유사도 활용
@router.get("/buckets", status_code=200)
def bucket_recommand_cbf(category: str, page: int = 0, size: int = 100,
		    db: Session = Depends(engine.get_session), 
	      	credentials: HTTPAuthorizationCredentials= Depends(security)):
	
	skip = size*page
	limit = size*page+size
	logger.info(f"skp: {skip}, limit: {limit}")

	logger.info(f"카테고리 정보: {category}")
	logger.info(credentials)
	token = decodeJWT(credentials.credentials)
	
	if('message' in token):
		raise HTTPException(status_code=401, detail="token is no valid")
	
	user_seq=token['userSeq']
	logger.info(f"LOGIN 정보: {user_seq}")

	category_seq = { "all" : 0, "대자연" : 1, "일상" : 2, "쇼핑" : 3, "여행" :4, "문화예술" : 5, "자기계발" : 6, "푸드" : 7, "아웃도어" : 8, "스포츠" : 9}
	search_category_seq = category_seq[category]
	logger.info(f"카테고리 seq: {search_category_seq}")

	prefer_data = db.query(Preference).filter(Preference.user_seq == user_seq).filter(Preference.is_delete == 0).all()
	pb_data = db.query(PublicBucket).filter(PublicBucket.is_public == 0).all()

	print(pb_data[0])
	print(pb_data[0].title)
	print(len(pb_data))


	# 유저가 몇명 이상이면 협업 필터링을 해야할까?
	user_sum = db.query(User).count()
	logger.info(f"유저 수: {user_sum}")

	# if(user_sum >= 10): 협업필터링
	# else:

	# json 형태로 변환
	pb_data = jsonable_encoder(pb_data)
	# print(data[0]['title'])

	# DataFrame 형태로 변환
	data = pd.DataFrame(pb_data)
	# print(data.head(2))

	logger.info(f"title 열의 결측값의 수: {data['title'].isnull().sum()}")

	stop_words=['하기']

	tfidf = TfidfVectorizer(stop_words=stop_words)
	tfidf_matrix = tfidf.fit_transform(data['title'])
	# print(tfidf)
	logger.info(f"TF-IDF 행렬의 크기(shape): {tfidf_matrix.shape}")

	cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
	logger.info(f"코사인 유사도 연산 결과: {cosine_sim.shape}")

	title_to_index = dict(zip(data['title'], data.index))

	idx = (title_to_index['등산하면서 경치 구경하기'])
	print(idx)
	
	# 추천 함수
	def get_recommendations(title, cosine_sim=cosine_sim):
		idx = title_to_index[title]

		sim_scores = list(enumerate(cosine_sim[idx]))

		# 유사도에 따라 버킷리스트들을 정렬한다.
		sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

		# 인덱스 skip부터 skip+limt까지의 가장 유사한 버킷리스트를 받아온다.
		sim_scores = sim_scores[page:page+size]
		# print(sim_scores)

		# 가장 유사한 인덱스 skip부터 skip+limt까지의 버킷리스트의 인덱스를 얻는다.
		bucket_indices = [idx[0] for idx in sim_scores]
		# print(bucket_indices)
		
		result = data.loc[bucket_indices]
		# print(result)

		# 가장 유사한 인덱스 skip부터 skip+limt까지의 버킷리스트 객체들을 리턴한다.
		return result

	
 	# prefer_data 3개 초과인 경우 
	if(len(prefer_data) > 3) :
		logger.info(f"prefer_data 개수: {len(prefer_data)}")
		
		random_prefer = random.sample(range(len(prefer_data)), 3)
		logger.info(f"random_prefer: {random_prefer}")

		result = pd.DataFrame()

		for i in random_prefer:
			logger.info(f"random select title: {prefer_data[i].publicBucket.title}")
			temp = get_recommendations(prefer_data[i].publicBucket.title)

			# print(temp)

			result = pd.concat([result, temp])
		
		
		result = result.drop_duplicates()
		
		# 선호도에서 겹치는 거 빼주기
		# print(type(prefer_data))

		# temp = result.drop_duplicates(subset=['등산하고 경치 구경하기'])
		result = result.sort_index()
		print(search_category_seq)
		
		# 카테고리 별 검색
		if(search_category_seq != 0):
			result = result[result.category_seq == search_category_seq]

		result = result.to_dict('records')


		return result


	# prefer_data 3개 이하인 경우
	else:
		logger.info(f"prefer_data 개수: {len(prefer_data)}")
		
		random_prefer = random.sample(range(len(prefer_data)), 3)
		logger.info(f"random_prefer: {random_prefer}")

		result = pd.DataFrame()

		for i in range(len(prefer_data)):
			logger.info(f"random select title: {prefer_data[i].publicBucket.title}")
			temp = get_recommendations(prefer_data[i].publicBucket.title)

			result = pd.concat([result, temp])

	
		result = result.drop_duplicates()
		result = result.sort_index()

		# 카테고리 별 검색
		if(search_category_seq != 0):
			result = result[result.category_seq == search_category_seq]

		result = result.to_dict('records')

		# 페이징 어케하지???????????
		return result


# Preference - title을 활용한 CF - ?? 활용
@router.get("/social/bucketlists", status_code=200)
def user_recommand_cf(category: str, page: int = 0, size: int = 100,
		    db: Session = Depends(engine.get_session), 
	      	credentials: HTTPAuthorizationCredentials= Depends(security)):
	
	skip = size*page
	limit = size*page+size
	logger.info(f"skp: {skip}, limit: {limit}")

	logger.info(credentials)
	token = decodeJWT(credentials.credentials)
	
	if('message' in token):
		raise HTTPException(status_code=401, detail="token is no valid")
	
	user_seq=token['userSeq']
	logger.info(f"LOGIN 정보: {user_seq}")

	prefer_data = db.query(Preference).filter(Preference.user_seq == user_seq).filter(Preference.is_delete == 0).all()
	pb_data = db.query(PublicBucket).filter(PublicBucket.is_public == 0).all()

	category_seq = { "all" : 0, "대자연" : 1, "일상" : 2, "쇼핑" : 3, "여행" :4, "문화예술" : 5, "자기계발" : 6, "푸드" : 7, "아웃도어" : 8, "스포츠" : 9}
	search_category_seq = category_seq[category]
	logger.info(f"카테고리 seq: {search_category_seq}")