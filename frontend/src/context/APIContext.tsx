import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authAPI, predictionsAPI } from '../services/api'

interface User {
  id: string
  email: string
  fullName: string
  createdAt: string
}

interface Prediction {
  id: string
  imageFilename: string
  predictedClass: string
  confidence: number
  eosinophilProb: number
  lymphocyteProb: number
  monocyteProb: number
  neutrophilProb: number
  processingTimeMs: number
  createdAt: string
}

interface Statistics {
  totalPredictions: number
  averageConfidence: number
  mostCommonClass: string | null
  classDistribution: Record<string, number>
}

interface APIContextType {
  user: User | null
  setUser: (user: User | null) => void
  token: string | null
  setToken: (token: string | null) => void
  predictions: Prediction[]
  setPredictions: (predictions: Prediction[]) => void
  statistics: Statistics | null
  setStatistics: (stats: Statistics | null) => void
  
  // Auth functions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, fullName: string, password: string) => Promise<void>
  logout: () => Promise<void>
  
  // Prediction functions
  predict: (file: File) => Promise<Prediction | null>
  fetchHistory: () => Promise<void>
  deletePrediction: (id: string) => Promise<void>
  fetchStatistics: () => Promise<void>
  
  // Loading & error states
  isLoading: boolean
  error: string | null
  clearError: () => void
}

const APIContext = createContext<APIContextType | undefined>(undefined)

export const APIProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sync user/token to localStorage whenever they change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    }
  }, [user, token])

  const clearError = () => setError(null)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authAPI.login(email, password)
      setToken(response.access_token)
      setUser({
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.full_name,
        createdAt: response.user.created_at,
      })
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify({
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.full_name,
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, fullName: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authAPI.register(email, fullName, password)
      setToken(response.access_token)
      setUser({
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.full_name,
        createdAt: response.user.created_at,
      })
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify({
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.full_name,
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authAPI.logout()
      setUser(null)
      setToken(null)
      setPredictions([])
      setStatistics(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const predict = async (file: File): Promise<Prediction | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await predictionsAPI.predict(file)
      const prediction: Prediction = {
        id: response.id,
        imageFilename: response.image_filename,
        predictedClass: response.predicted_class,
        confidence: response.confidence,
        eosinophilProb: response.eosinophil_prob,
        lymphocyteProb: response.lymphocyte_prob,
        monocyteProb: response.monocyte_prob,
        neutrophilProb: response.neutrophil_prob,
        processingTimeMs: response.processing_time_ms,
        createdAt: response.created_at,
      }
      await fetchHistory()
      return prediction
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Prediction failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await predictionsAPI.getHistory()
      const formattedPredictions: Prediction[] = response.map(p => ({
        id: p.id,
        imageFilename: p.image_filename,
        predictedClass: p.predicted_class,
        confidence: p.confidence,
        eosinophilProb: p.eosinophil_prob,
        lymphocyteProb: p.lymphocyte_prob,
        monocyteProb: p.monocyte_prob,
        neutrophilProb: p.neutrophil_prob,
        processingTimeMs: p.processing_time_ms,
        createdAt: p.created_at,
      }))
      setPredictions(formattedPredictions)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch history'
      setError(message)
    }
  }

  const deletePrediction = async (id: string) => {
    setIsLoading(true)
    try {
      await predictionsAPI.deletePrediction(id)
      setPredictions(predictions.filter(p => p.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const response = await predictionsAPI.getStatistics()
      setStatistics({
        totalPredictions: response.total_predictions,
        averageConfidence: response.average_confidence,
        mostCommonClass: response.most_common_class,
        classDistribution: response.class_distribution,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch statistics'
      setError(message)
    }
  }

  return (
    <APIContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        predictions,
        setPredictions,
        statistics,
        setStatistics,
        login,
        register,
        logout,
        predict,
        fetchHistory,
        deletePrediction,
        fetchStatistics,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

export const useAPI = () => {
  const context = useContext(APIContext)
  if (context === undefined) {
    throw new Error('useAPI must be used within APIProvider')
  }
  return context
}
