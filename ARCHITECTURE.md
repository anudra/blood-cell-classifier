# System Architecture

Technical architecture of the Blood Cell Classification System.

---

## Overview

3-tier architecture with frontend, backend, and database layers.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        UI["React Frontend<br/>TypeScript + Tailwind"]
    end
    
    subgraph Server["Server Layer"]
        API["FastAPI Backend<br/>Python 3.10+"]
        Model["ML Model<br/>TensorFlow/Keras"]
        Process["Image Processing<br/>OpenCV"]
    end
    
    subgraph Data["Data Layer"]
        DB["PostgreSQL<br/>SQLAlchemy ORM"]
    end
    
    UI -->|HTTP/REST| API
    API --> Model
    API --> Process
    API --> DB
```

---

## Component Architecture

### Frontend Components

```mermaid
graph TD
    App["App.tsx"]
    
    App --> Home["Home Page"]
    App --> Dashboard["Dashboard Page"]
    App --> Layout["Layout"]
    
    Home --> Upload["ImageUpload"]
    Home --> Result["PredictionResult"]
    Home --> Chart["ConfidenceChart"]
    
    Dashboard --> History["HistoryList"]
    Dashboard --> Stats["Statistics"]
    
    Layout --> Header["Header"]
    Layout --> Footer["Footer"]
```

### Backend Structure

```mermaid
graph TD
    Main["main.py<br/>FastAPI App"]
    
    Main --> Routes["Routes/"]
    Main --> Services["Services/"]
    Main --> Models["Models/"]
    
    Routes --> Predict["predict.py"]
    Routes --> History["history.py"]
    Routes --> Stats["stats.py"]
    
    Services --> Inference["inference.py"]
    Services --> Preprocess["preprocessing.py"]
    Services --> Database["database.py"]
    
    Models --> DB["Database Models"]
```

---

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Model
    participant Database
    
    User->>Frontend: Upload Image
    Frontend->>Backend: POST /api/predict
    Backend->>Backend: Validate File
    Backend->>Backend: Preprocess Image
    Backend->>Model: Get Prediction
    Model-->>Backend: Probabilities
    Backend->>Database: Save Result
    Database-->>Backend: Confirmation
    Backend-->>Frontend: Prediction JSON
    Frontend->>User: Display Results
```

---

## Technology Stack

- **Frontend**: React 18.2, TypeScript, Tailwind CSS, Axios
- **Backend**: FastAPI, Python 3.10+, Pydantic
- **ML**: TensorFlow 2.14, Keras, OpenCV
- **Database**: PostgreSQL, SQLAlchemy ORM
- **DevOps**: Docker, Docker Compose

---

## API Endpoints

```mermaid
graph LR
    A["Client"] 
    
    A -->|POST /api/predict| B["Upload & Predict"]
    A -->|GET /api/history| C["Get History"]
    A -->|GET /api/statistics| D["Get Stats"]
    A -->|GET /api/health| E["Health Check"]
    
    B --> F["Database"]
    C --> F
    D --> F
    E --> G["System Status"]
```

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Sign Up / Login
    Frontend->>Backend: POST /api/auth/register or /login
    Backend->>Backend: Validate credentials
    Backend->>Database: Check user exists
    Database-->>Backend: User data
    Backend->>Backend: Hash password (if signup)
    Backend->>Database: Save/Update user
    Backend-->>Frontend: JWT Token + User Info
    Frontend->>Frontend: Store token in localStorage
    Frontend->>User: Redirect to Dashboard
```

---

## Database Schema

```mermaid
erDiagram
    USER ||--o{ PREDICTION : makes
    USER ||--o{ SESSION : creates
    PREDICTION ||--o{ STATISTICS : contributes
    
    USER {
        uuid id
        string email
        string password_hash
        string full_name
        boolean email_verified
        timestamp created_at
        timestamp updated_at
    }
    
    PREDICTION {
        uuid id
        uuid user_id
        string predicted_class
        float confidence
        float prob_lymphocyte
        float prob_monocyte
        float prob_neutrophil
        float prob_eosinophil
        int processing_time_ms
        timestamp created_at
    }
    
    SESSION {
        uuid id
        uuid user_id
        string token
        timestamp expires_at
    }
    
    STATISTICS {
        uuid id
        date date
        int total_predictions
        float avg_confidence
        string most_common_class
    }
```

---

## Deployment

```mermaid
graph TB
    subgraph Docker["Docker Container"]
        Frontend["Frontend<br/>Port 3000"]
        Backend["Backend<br/>Port 8000"]
        DB["PostgreSQL<br/>Port 5432"]
    end
    
    User["User"] -->|localhost:3000| Frontend
    Frontend -->|HTTP| Backend
    Backend --> DB
    
    Backend -.->|Model<br/>4.6M params| Model["Keras Model"]
```

---