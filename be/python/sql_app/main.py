from fastapi import FastAPI

from typing import List

from .database import engine

app = FastAPI()

@app.get('/')
def home():
	return {"message": "Hello world!"}