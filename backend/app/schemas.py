from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Auth schemas
class UserRegister(BaseModel):
    email: EmailStr
    full_name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Prediction schemas - Single base model with all fields
class PredictionResponse(BaseModel):
    id: str
    image_filename: str
    predicted_class: str
    confidence: float
    eosinophil_prob: float
    lymphocyte_prob: float
    monocyte_prob: float
    neutrophil_prob: float
    processing_time_ms: float
    created_at: datetime

    class Config:
        from_attributes = True

# Statistics schema
class StatisticsResponse(BaseModel):
    total_predictions: int
    average_confidence: float
    most_common_class: Optional[str]
    class_distribution: dict
