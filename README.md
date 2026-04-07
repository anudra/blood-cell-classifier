# Blood Cell Classification System

This project classifies blood cells from microscopic images using a trained deep learning model. Upload an image, get instant predictions with confidence scores for all cell types. Built as a full-stack web application with FastAPI backend and React frontend.

**The Flow:**
Upload microscopic image → Model analyzes and classifies → See predictions with confidence breakdown and probabilities → Results saved to history for tracking and analysis.

## Features

- User authentication (Sign up / Login)
- Real-time prediction (<500ms inference)
- Drag & drop image upload
- Confidence score breakdown
- Prediction history & tracking (per-user, cloud-synced)
- Statistics dashboard
- Responsive UI (mobile friendly)

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Docker (optional)

### Installation & Run

**Clone**
```bash
git clone https://github.com/yourusername/blood-cell-detection.git
cd blood-cell-detection
```

**Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`

**Or use Docker**
```bash
docker-compose up --build
```

## Model Setup

⚠️ **Important**: The trained model file is **not included in the repository** (too large for git).

### Get the Model (Choose One):

**Option 1: Run the Training Script** (Recommended)
```bash
# Install dependencies
pip install tensorflow keras numpy pillow

# Run the training notebook
jupyter notebook model\ training.ipynb
```
This will generate `blood_cell_model_best.keras` in the project root.

**Option 2: Download Pre-trained Model**
- Download from provided link (ask instructor)
- Place in project root as: `blood_cell_model_best.keras`

### Verify Model is Ready
The app checks for the model on startup. You'll see:
```
✓ Loaded actual trained model from blood_cell_model_best.keras
```

If model not found:
```
Model not found. Using mock predictions.
```

The system has a **graceful fallback** to random predictions if the model is missing, so the app won't crash—but predictions will be random until you set up the model.

## Tech Stack

- **Backend**: FastAPI, Python 3.10+
- **Frontend**: React 18.2, TypeScript, Tailwind
- **ML**: TensorFlow 2.14, Keras
- **Database**: PostgreSQL
- **DevOps**: Docker

## Model Performance

- Accuracy: 72.98% (test set)
- Inference: 200-300ms per image
- Parameters: 4.6M
- Trained on 8,463 samples

## API Endpoints

**Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

**Predictions**
- `POST /api/predict` - Upload & predict (authenticated)
- `GET /api/history` - Get user predictions (authenticated)
- `DELETE /api/history/{id}` - Delete prediction (authenticated)
- `GET /api/statistics` - Get user stats (authenticated)

**System**
- `GET /api/health` - Health check

## Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design.
See [FEATURES.md](./FEATURES.md) for detailed features.

