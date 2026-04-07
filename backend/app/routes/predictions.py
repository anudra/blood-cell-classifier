from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, Prediction
from app.schemas import PredictionResponse, StatisticsResponse
from app.auth import get_current_user
from app.ml_model import get_model

router = APIRouter(prefix="/api", tags=["predictions"])

@router.post("/predict", response_model=PredictionResponse)
async def predict(
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Read image file
    image_data = await file.read()
    
    # Get prediction from model
    model = get_model()
    prediction_result = model.predict(image_data)
    
    # Save to database
    prediction = Prediction(
        user_id=current_user_id,
        image_filename=file.filename,
        predicted_class=prediction_result["predicted_class"],
        confidence=prediction_result["confidence"],
        eosinophil_prob=prediction_result["eosinophil_prob"],
        lymphocyte_prob=prediction_result["lymphocyte_prob"],
        monocyte_prob=prediction_result["monocyte_prob"],
        neutrophil_prob=prediction_result["neutrophil_prob"],
        processing_time_ms=prediction_result["processing_time_ms"]
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    
    return PredictionResponse.from_orm(prediction)

@router.get("/history", response_model=list[PredictionResponse])
async def get_history(
    current_user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    predictions = db.query(Prediction)\
        .filter(Prediction.user_id == current_user_id)\
        .order_by(Prediction.created_at.desc())\
        .all()
    
    return [PredictionResponse.from_orm(p) for p in predictions]

@router.delete("/history/{prediction_id}")
async def delete_prediction(
    prediction_id: str,
    current_user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    prediction = db.query(Prediction)\
        .filter(Prediction.id == prediction_id, Prediction.user_id == current_user_id)\
        .first()
    
    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction not found"
        )
    
    db.delete(prediction)
    db.commit()
    
    return {"message": "Prediction deleted successfully"}

@router.get("/statistics", response_model=StatisticsResponse)
async def get_statistics(
    current_user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    predictions = db.query(Prediction)\
        .filter(Prediction.user_id == current_user_id)\
        .all()
    
    if not predictions:
        return {
            "total_predictions": 0,
            "average_confidence": 0,
            "most_common_class": None,
            "class_distribution": {}
        }
    
    total = len(predictions)
    avg_confidence = sum(p.confidence for p in predictions) / total
    
    # Count class distribution
    class_dist = {}
    for p in predictions:
        class_dist[p.predicted_class] = class_dist.get(p.predicted_class, 0) + 1
    
    most_common = max(class_dist, key=class_dist.get) if class_dist else None
    
    return {
        "total_predictions": total,
        "average_confidence": float(avg_confidence),
        "most_common_class": most_common,
        "class_distribution": class_dist
    }
