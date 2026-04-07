// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Types
interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    id: string
    email: string
    full_name: string
    created_at: string
  }
}

interface PredictionResponse {
  id: string
  image_filename: string
  predicted_class: string
  confidence: number
  eosinophil_prob: number
  lymphocyte_prob: number
  monocyte_prob: number
  neutrophil_prob: number
  processing_time_ms: number
  created_at: string
}

interface StatisticsResponse {
  total_predictions: number
  average_confidence: number
  most_common_class: string | null
  class_distribution: Record<string, number>
}

// Utility function to get auth header
function getAuthHeader(): { Authorization: string } | {} {
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

// Auth API
export const authAPI = {
  async register(email: string, fullName: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, full_name: fullName, password }),
    })
    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },
}

// Predictions API
export const predictionsAPI = {
  async predict(file: File): Promise<PredictionResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: getAuthHeader() as any,
      body: formData,
    })
    if (!response.ok) throw new Error('Prediction failed')
    return response.json()
  },

  async getHistory(): Promise<PredictionResponse[]> {
    const response = await fetch(`${API_URL}/api/history`, {
      headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error('Failed to fetch history')
    return response.json()
  },

  async deletePrediction(predictionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/history/${predictionId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error('Failed to delete prediction')
  },

  async getStatistics(): Promise<StatisticsResponse> {
    const response = await fetch(`${API_URL}/api/statistics`, {
      headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error('Failed to fetch statistics')
    return response.json()
  },
}
