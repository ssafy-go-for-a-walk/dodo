import random
import logging
import pandas as pd
from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func
from sqlalchemy.orm import Session
from config import conn
from database.models import Category, Preference, PublicBucket, User, BucketListMember, BucketList
from auth.auth_handler import decodeJWT
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from surprise import Dataset, SVD, accuracy, Reader
from database.schemas import Category_dto
# from surprise.model_selection import train_test_split


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

	category_seq = { "전체" : 0, "대자연" : 1, "일상" : 2, "쇼핑" : 3, "여행" :4, "문화예술" : 5, "자기계발" : 6, "푸드" : 7, "아웃도어" : 8, "스포츠" : 9}
	search_category_seq = category_seq[category]
	logger.info(f"카테고리 seq: {search_category_seq}")

	prefer_data = db.query(Preference).filter(Preference.user_seq == user_seq).filter(Preference.is_delete == 0).all()
	pb_data = db.query(PublicBucket).filter(PublicBucket.is_public == 0).all()

	for i in pb_data:
		i.category

	# temp = jsonable_encoder(pb_data[0])
	# print(temp)

	# TODO 유저가 몇명 이상이면 협업 필터링을 해야할까?
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

	# idx = (title_to_index['등산하면서 경치 구경하기'])
	# print(idx)
	
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
		
		
		result = result.drop_duplicates(['title'])
		
		# TODO 선호도에서 겹치는 거 빼주기
		# print(type(prefer_data))

		# temp = result.drop_duplicates(subset=['등산하고 경치 구경하기'])
		result = result.sort_index()
		print(search_category_seq)
		
		# 카테고리 별 검색
		if(search_category_seq != 0):
			result = result[result.category_seq == search_category_seq]

		result = result.to_dict('records')

		# TODO 페이징
		return result


	# prefer_data 3개 이하인 경우
	else:
		logger.info(f"prefer_data 개수: {len(prefer_data)}")
		
		result = pd.DataFrame()

		for i in range(len(prefer_data)):
			logger.info(f"random select title: {prefer_data[i].publicBucket.title}")
			temp = get_recommendations(prefer_data[i].publicBucket.title)

			result = pd.concat([result, temp])

		result = result.drop_duplicates(['title'])
		# print(result)

		result = result.sort_index()

		# 카테고리 별 검색
		if(search_category_seq != 0):
			result = result[result.category_seq == search_category_seq]
		
		result = result.to_dict('records')

		print(result[0])

		# TODO 페이징
		return result


# Preference - title을 활용한 CF - ?? 활용
# 코사인 유사도 - 사용자 간의 유사도 계산 후 유사도 높은 사용자의 버킷리스트 추천
@router.get("/social/bucketlists", status_code=200)
def user_recommand_cf(page: int = 0, size: int = 2,
		    db: Session = Depends(engine.get_session), 
	      	credentials: HTTPAuthorizationCredentials= Depends(security)):

	logger.info(credentials)
	token = decodeJWT(credentials.credentials)
	
	logger.info(token)
	
	if('message' in token):
		raise HTTPException(status_code=401, detail="token is no valid")
	
	userSeq=token['userSeq']
	logger.info(f"LOGIN 정보: {userSeq}")

	prefer_data = db.query(Preference)\
		.filter(Preference.is_delete == 0)\
		.filter(Preference.user_seq.in_(\
		db.query(Preference.user_seq).group_by(Preference.user_seq).having(func.count(Preference.user_seq) > 1)))\
		.all()
	pb_data = db.query(PublicBucket).filter(PublicBucket.is_public == 0).all()


	# json 형태로 변환
	prefer_data = jsonable_encoder(prefer_data)
	pb_data = jsonable_encoder(pb_data)

	# DataFrame 형태로 변환
	prefer_data = pd.DataFrame(prefer_data)
	pb_data = pd.DataFrame(pb_data)

	# is_delete 값을 rating으로 사용
	prefer_data['is_delete'] = prefer_data['is_delete']+1
	# if(prefer_data['is_delete'] == 1):
	# 	prefer_data['is_delete']+1

	# print(pb_data.head(3))

	reader = Reader(rating_scale=(0.5, 5.0))
	temp = Dataset.load_from_df(prefer_data[['seq', 'bucket_seq', 'user_seq']], reader)
	
	userlen = len(prefer_data["user_seq"].unique())
	pblen = len(pb_data["seq"].unique())

	logger.info(f"고유 아이디 수: {userlen}")
	logger.info(f"공개된 버킷리스트 수: {pblen}")

	# index = user_seq, column = bucket_seq 행렬 만들기
	x = prefer_data.copy()
	y = prefer_data['user_seq']

	x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.26, stratify=y, random_state=0)

	# test_size = 0.25, 25% 랜덤 데이터가 x_test로 추출됨
	prefer_matrix = x_train.pivot(values='is_delete', index='user_seq', columns='bucket_seq')
	# print(prefer_matrix)

	# user sim matrix
	matrix_dummy = prefer_matrix.copy().fillna(0)
	user_sim = cosine_similarity(matrix_dummy, matrix_dummy)
	user_sim = pd.DataFrame(user_sim, index=prefer_matrix.index, columns=prefer_matrix.index)

	# temp = user_sim[['user_seq', userSeq]]
	# print(temp)

	user_list = user_sim[userSeq].sort_values(ascending=False)
	user_list = pd.DataFrame(user_list)

	print(user_list)
	print("---------------")

	logger.info(f"user list length: {len(user_list)}")

	if((page*size+size) <= len(user_list)-1):
		start = page*size
		end = page*size + size
		is_end = False
	elif(((page*size) < len(user_list)-1) & ((page*size+size) > len(user_list)-1)):
		start = page*size
		end = len(user_list)-1
		is_end = True
	else:
		return {"is_end" : True}
	
	logger.info(f"start: {start}, end: {end}")
	

	for i in range(start, end):
		now_user_seq = user_list.index[i+1] 
		logger.info(f"now_user_seq: {now_user_seq}")

		user_data = db.query(BucketListMember).join(BucketList)\
			.filter(BucketListMember.bucketlist_seq == BucketList.seq)\
			.filter(BucketList.type == 'SINGLE')\
			.all()

	
	for i in range(len(user_data)):
		print(user_data[i].bucketlist.title)




	# trainset, testset = train_test_split(temp, test_size=0.25, random_state=0)

	# algo = SVD(n_factors=50, random_state=13)
	# algo.fit(trainset)
	# predictions = algo.test(testset)
	# accuracy.rmse(predictions)

	# print(predictions[:5])


	return "data"