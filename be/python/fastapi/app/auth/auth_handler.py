import jwt, time
from typing import Dict
from decouple import config

JWT_SECRET = config("SECRET")
JWT_ALGORITHM = config("ALGORITHM")

def token_response(token: str):
    return {"access_token": token}

def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        # return {"userSeq" : 2}
        return decoded_token
    except:
        # return {"userSeq" : 2}
        return {"message": "token decode error"}