import json
import os
import redis
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from decouple import config


def redis_config() :
    
    try:
        REDIS_HOST = str(config("REDIS_HOST"))
        REDIS_PORT = int(config("REDIS_PORT"))
        REDIS_DATABASE = int(config("REDIS_DATABASE"))
        rd = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
        return rd

    except:
        print("redis connection failure")


class conn:
    def __init__(self) :
        DB_URL = config("MYSQL_URL")
        
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

