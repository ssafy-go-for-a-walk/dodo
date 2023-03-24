import logging
from fastapi import Depends, APIRouter, Header
from sqlalchemy.orm import Session
from config import conn
from database.models import Category, Preference
from auth.auth_handler import decodeJWT
from typing import Optional

router = APIRouter()

engine = conn()

# logging
logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

@router.get('/test')
def session_test(db: Session = Depends(engine.get_session)): # Depends : api가 호출될 때마다 db 세션 생성, 사용 끝나면 자동 세션 해제
	example = db.query(Category).all()
	return example

# Preference - title을 활용한 CBF - 코사인 유사도 활용
@router.get("/buckets")
async def bucket_recommand(category: str,
		    db: Session = Depends(engine.get_session), 
	        Authorization: Optional[str] = Header("None")):
	data = db.query(Preference).filter()
	
	logger.info(category)
	# logger.info(Authorization)
	token = decodeJWT(Authorization.split(' ')[1])
	logger.info(f"LOGIN 정보: {token['userSeq']}")
	
    
	return data # 나중에 추천된 목록 리턴하기