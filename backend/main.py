# # from fastapi import FastAPI
# # from api.routes import router
# # from fastapi.staticfiles import StaticFiles

# # app = FastAPI(title="AI Tester Agent")


# # app.include_router(router)

# # @app.get("/")
# # def home():
# #     return {"message": "AI Tester Agent Running"}
# # app.mount("/automation/screenshots", StaticFiles(directory="automation/screenshots"), name="screenshots")

# import os
# from fastapi import FastAPI
# from api.routes import router
# from fastapi.staticfiles import StaticFiles

# app = FastAPI(title="AI Tester Agent")

# app.include_router(router)

# @app.get("/")
# def home():
#     return {"message": "AI Tester Agent Running"}

# # ✅ absolute path
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# screenshots_path = os.path.join(BASE_DIR, "automation", "screenshots")

# # create folder if not exists
# os.makedirs(screenshots_path, exist_ok=True)

# # ✅ clean URL
# app.mount("/screenshots", StaticFiles(directory=screenshots_path), name="screenshots")

# import os
# from fastapi import FastAPI
# from api.routes import router
# from fastapi.staticfiles import StaticFiles

# app = FastAPI(title="AI Tester Agent")

# app.include_router(router)

# @app.get("/")
# def home():
#     return {"message": "AI Tester Agent Running"}

# # ✅ screenshots path fix
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# screenshots_path = os.path.join(BASE_DIR, "automation", "screenshots")
# os.makedirs(screenshots_path, exist_ok=True)

# app.mount("/screenshots", StaticFiles(directory=screenshots_path), name="screenshots")

# import os
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

# from api.routes import router

# # -------------------------------
# # App Initialization
# # -------------------------------
# app = FastAPI(
#     title="AI Tester Agent",
#     description="AI-powered Test Case Generator & Executor",
#     version="1.0.0"
# )

# # -------------------------------
# # CORS (Frontend connect ke liye)
# # -------------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # demo ke liye (prod me restrict karna)
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -------------------------------
# # Include Routes
# # -------------------------------
# app.include_router(router)

# # -------------------------------
# # Root API
# # -------------------------------
# @app.get("/")
# def home():
#     return {
#         "message": "AI Tester Agent Running 🚀",
#         "status": "OK"
#     }

# # -------------------------------
# # Screenshots Folder Setup
# # -------------------------------
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# screenshots_path = os.path.join(BASE_DIR, "automation", "screenshots")

# # folder create if not exists
# os.makedirs(screenshots_path, exist_ok=True)

# # -------------------------------
# # Static Mount (IMPORTANT 🔥)
# # -------------------------------
# app.mount(
#     "/screenshots",
#     StaticFiles(directory=screenshots_path),
#     name="screenshots"
# )

# # -------------------------------
# # Health Check (optional but useful)
# # -------------------------------
# @app.get("/health")
# def health_check():
#     return {"status": "healthy"}

import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="AI Tester Agent")

# ✅ CORS FIX (VERY IMPORTANT 🔥)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev ke liye
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "AI Tester Agent Running"}

# ✅ screenshots path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
screenshots_path = os.path.join(BASE_DIR, "automation", "screenshots")
os.makedirs(screenshots_path, exist_ok=True)

app.mount("/screenshots", StaticFiles(directory=screenshots_path), name="screenshots")