import numpy as np
from PIL import Image
import io
import time

# Mock model for MVP - replace with actual TensorFlow model later
class MockBloodCellModel:
    def __init__(self):
        self.classes = ["eosinophil", "lymphocyte", "monocyte", "neutrophil"]
    
    def predict(self, image_data: bytes) -> dict:
        """Mock prediction - returns random probabilities"""
        start_time = time.time()
        
        # Generate random probabilities
        probs = np.random.dirichlet(np.ones(4))
        predicted_class_idx = np.argmax(probs)
        predicted_class = self.classes[predicted_class_idx]
        confidence = float(probs[predicted_class_idx])
        
        processing_time_ms = (time.time() - start_time) * 1000
        
        return {
            "predicted_class": predicted_class,
            "confidence": float(confidence),
            "eosinophil_prob": float(probs[0]),
            "lymphocyte_prob": float(probs[1]),
            "monocyte_prob": float(probs[2]),
            "neutrophil_prob": float(probs[3]),
            "processing_time_ms": processing_time_ms
        }

# Initialize mock model
model = MockBloodCellModel()

def get_model():
    return model
