from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import recommand

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

# 라우터 정의
app.include_router(recommand.router)

@app.get('/')
def home():
	return {"message": "Hello world!"}

