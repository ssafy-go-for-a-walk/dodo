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
