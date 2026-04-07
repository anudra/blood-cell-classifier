from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Blood Cell Classification API",
    description="API for classifying blood cells using deep learning",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Blood Cell Classification API v0.1"}

@app.get("/health")
async def health():
    return {"status": "ok"}
