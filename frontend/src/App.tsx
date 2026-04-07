import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Classify from './pages/Classify'
import Results from './pages/Results'
import { APIProvider, useAPI } from './context/APIContext'

function AppContent() {
  const { user } = useAPI()

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {user && <Navbar />}
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/results" element={<Results />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default function App() {
  return (
    <APIProvider>
      <AppContent />
    </APIProvider>
  )
}
