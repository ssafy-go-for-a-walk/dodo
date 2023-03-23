import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from fastapi import Depends
from sqlalchemy.orm import Session
from database import conn

from models import Category

engine = conn()

def testt(data):
    print("??")

    data = data.head(2)
    print(data)