import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  user: any
  setUser: (user: null) => void
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              🔬
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
