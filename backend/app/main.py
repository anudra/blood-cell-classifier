from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.config import ALLOWED_ORIGINS
from app.routes import auth, predictions

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blood Cell Classification API",
    description="API for classifying blood cells using deep learning",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(predictions.router)

@app.get("/")
async def root():
    return {"message": "Blood Cell Classification API v0.1"}

@app.get("/health")
async def health():
    return {"status": "ok"}
