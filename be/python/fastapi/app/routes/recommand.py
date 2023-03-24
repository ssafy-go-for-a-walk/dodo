from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from database.config import conn
from database.models import Category

router = APIRouter()

engine = conn()

@router.get('/test')
def session_test(db: Session = Depends(engine.get_session)): # Depends : api가 호출될 때마다 db 세션 생성, 사용 끝나면 자동 세션 해제
	example = db.query(Category).all()
	return example

@router.get("/buckets/")
def bucket_recommand(category: str):
	print(category)
	return {"message": "Hello world!"}