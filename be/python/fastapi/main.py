import fastapi

app = fastapi.FastAPI()

@app.get('/')
def home():
	return {"message": "Hello world!"}