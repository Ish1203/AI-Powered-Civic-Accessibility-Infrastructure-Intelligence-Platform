from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.database.database import init_db


app = FastAPI(
    title="AccessPath AI",
    description=(
        "AI-powered civic issue reporting "
        "and resolution platform"
    ),
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():

    init_db()


@app.get("/")
def root():

    return {
        "message": "AccessPath AI API is running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


app.include_router(
    api_router,
    prefix="/api",
)