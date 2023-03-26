from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from routes import recommand
from config import conn

from database.schemas import Category_dto

app = FastAPI()

origins = ["*"]

# 미들웨어 정의
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = conn()

# 라우터 정의
app.include_router(recommand.router)

@app.get('/')
def home():
	return {"message": "Hello world!"}

@app.get('/test', response_model=Category_dto)
def session_test(db: Session = Depends(engine.get_session)):  # Depends : api가 호출될 때마다 db 세션 생성, 사용 끝나면 자동 세션 해제
	example = recommand.session_test(db)
	return example

