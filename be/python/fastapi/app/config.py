import json
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from decouple import config

class conn:
    def __init__(self) :
        DB_URL = config("db_url")
        
        # USER = config("user")
        # PASSWORD = config("password")
        # HOST = config("host")
        # PORT = config("port")
        # DATABASE = config("database")
    
        # DB_URL = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}?charset=utf8mb4"

        # 커넥션 풀 생성
        self.engine = create_engine(DB_URL)
    
    def get_session(self):
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        session = SessionLocal()
        try:
            yield session
        finally:
            session.close()
    
    def connection(self):
        conn = self.engine.connect()
        return conn
