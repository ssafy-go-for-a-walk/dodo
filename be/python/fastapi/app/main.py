from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import conn
from models import Category

from recomm import testt

app = FastAPI()

engine = conn()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def home():
	return {"message": "Hello world!"}


@app.get('/sessionTest')
def session_test(db: Session = Depends(engine.get_session)): # Depends : api가 호출될 때마다 db 세션 생성, 사용 끝나면 자동 세션 해제
	example = db.query(Category).all()
	return example

@app.get('/hello')
def myname(db: Session = Depends(engine.get_session)):
	data = db.query(Category).all()
	testt(data)