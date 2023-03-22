import json
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class conn:
    def __init__(self) :
        # 상대 경로 : dirname
        BASE_URL = os.path.dirname(os.path.abspath(__file__))

        # join() : 경로명 조작에 관한 처리를 모아둔 모듈로써 구현된 함수, 2개의 인자 결합하여 1개의 경로 
        SECRET_FILE = os.path.join(BASE_URL, 'db-application.json')
        secrets = json.loads(open(SECRET_FILE).read())
        DB = secrets["DB"]

        DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"

        # 커넥션 풀 생성
        self.engine = create_engine(DB_URL, encoding = 'utf-8')
    
    def sessionMaker(self):
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        session = SessionLocal()
        return session
    
    def connection(self):
        conn = self.engine.connect()
        return conn

    # def connection(self):
    #     conn = self.engine.connect()
    #     return conn
        



