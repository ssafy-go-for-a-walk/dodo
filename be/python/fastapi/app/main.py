from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from database import conn
from models import Category

app = FastAPI()

engine = conn()
session = engine.sessionMaker()

class Item(BaseModel):
	seq: int
	item: str

@app.get('/')
def home():
	return {"message": "Hello world!"}


@app.get('/sessionTest')
def session_test():
	example = session.query(Category).all()
	return example
