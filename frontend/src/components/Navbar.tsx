import { Link, useNavigate } from 'react-router-dom'
import { useAPI } from '../context/APIContext'

const MicroscopeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAPI()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-white font-bold">
              <span className="text-2xl">🔬</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blood Cell Classifier</h1>
              <p className="text-xs text-gray-600">CNN-based white blood cell analysis</p>
            </div>
          </Link>
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-cyan-600 font-medium transition">
              Home
            </Link>
            <Link to="/classify" className="text-gray-700 hover:text-cyan-600 font-medium transition">
              Classify
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-cyan-600 font-medium transition">
              Results
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-sm text-gray-700">
              <p className="font-medium">Welcome, {user?.fullName || user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
