# Blood Cell Classification System

This project classifies blood cells from microscopic images using a trained deep learning model. Upload an image, get instant predictions with confidence scores for all cell types. Built as a full-stack web application with FastAPI backend and React frontend.

**The Flow:**
Upload microscopic image → Model analyzes and classifies → See predictions with confidence breakdown and probabilities → Results saved to history for tracking and analysis.

## Features

- Real-time prediction (<500ms inference)
- Drag & drop image upload
- Confidence score breakdown
- Prediction history & tracking
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

- `POST /api/predict` - Upload & predict
- `GET /api/history` - Get predictions
- `GET /api/statistics` - Get stats
- `GET /api/health` - Health check

## Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design.
See [FEATURES.md](./FEATURES.md) for detailed features.

