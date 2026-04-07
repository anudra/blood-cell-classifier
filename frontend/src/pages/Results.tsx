import { useEffect, useState } from 'react'
import { useAPI } from '../context/APIContext'
import { FiBarChart2, FiTrash2 } from 'react-icons/fi'

export default function Results() {
  const { predictions, fetchHistory, deletePrediction, isLoading } = useAPI()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteToast, setDeleteToast] = useState<string | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await deletePrediction(id)
      await fetchHistory()
      setDeleteToast(id)
      setTimeout(() => setDeleteToast(null), 2000)
    } finally {
      setDeleting(null)
    }
  }

  const handleClearAll = async () => {
    if (predictions.length === 0) return
    if (window.confirm(`Delete all ${predictions.length} predictions? This cannot be undone.`)) {
      setDeleting('all')
      try {
        await Promise.all(predictions.map(p => deletePrediction(p.id)))
        await fetchHistory()
        setDeleteToast('all')
        setTimeout(() => setDeleteToast(null), 2000)
      } finally {
        setDeleting(null)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 flex justify-center">Loading...</div>
          <p className="text-gray-600">Fetching your classification history</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Classification Results</h1>
          <p className="text-gray-600">View your past classification results and analysis</p>
        </div>
        {predictions.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={deleting === 'all'}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {deleting === 'all' ? 'Clearing...' : 'Clear All'}
          </button>
        )}
      </div>
      
      {predictions.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4 flex justify-center">
            <FiBarChart2 />
          </div>
          <p className="text-lg text-gray-600 mt-2">No results yet. Start classifying images to see results here.</p>
          <a href="/classify" className="mt-6 inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition">
            Go to Classify
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{prediction.imageFilename}</h3>
                  <p className="text-sm text-gray-600">{new Date(prediction.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(prediction.id)}
                  disabled={deleting === prediction.id}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                  title="Delete prediction"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Main Result */}
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-sm text-gray-600 mb-1">Detected Cell Type</p>
                  <p className="text-3xl font-bold text-cyan-600">{prediction.predictedClass.toUpperCase()}</p>
                  <p className="text-sm text-gray-600 mt-2">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                </div>
                
                {/* Cell Probabilities */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">All Class Probabilities</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Neutrophil</span>
                      <span className="font-bold text-cyan-600">{(prediction.neutrophilProb * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Lymphocyte</span>
                      <span className="font-bold text-cyan-600">{(prediction.lymphocyteProb * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Monocyte</span>
                      <span className="font-bold text-cyan-600">{(prediction.monocyteProb * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Eosinophil</span>
                      <span className="font-bold text-cyan-600">{(prediction.eosinophilProb * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <span>✓</span>
          <span>{deleteToast === 'all' ? 'All predictions deleted' : 'Prediction deleted'}</span>
        </div>
      )}
    </div>
  )
}
