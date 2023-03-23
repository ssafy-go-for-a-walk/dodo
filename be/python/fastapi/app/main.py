from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import conn
from models import Category

app = FastAPI()

engine = conn()

class Item(BaseModel):
	seq: int
	item: str
	is_delete: int

@app.get('/')
def home():
	return {"message": "Hello world!"}


@app.get('/sessionTest')
def session_test(db: Session = Depends(engine.get_session)): # Depends : api가 호출될 때마다 db 세션 생성, 사용 끝나면 자동 세션 해제
	example = db.query(Category).all()
	return example

