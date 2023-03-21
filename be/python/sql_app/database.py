import json
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 상대 경로 : dirname
BASE_URL = os.path.dirname(os.path.abspath(__file__))
# join() : 경로명 조작에 관한 처리를 모아둔 모듈로써 구현된 함수, 2개의 인자 결합하여 1개의 경로 
SECRET_FILE = os.path.join(BASE_URL, 'db-application.json')
secrets = json.loads(open(SECRET_FILE).read())

DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"

# 커넥셕 풀 생성
engine = create_engine(
    DB_URL, encoding = 'utf-8'
)

SessionLocal = sessionmaker(autocommit=Fasle, autoflush=False, bind=engine)

# 데이터 모델 구성을 위한 클래스
Base = declarative_base()