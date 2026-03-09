from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="AI Tester Agent")

app.include_router(router)

@app.get("/")
def home():
    return {"message": "AI Tester Agent Running"}