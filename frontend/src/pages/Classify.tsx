import { useState } from 'react'
import { FiUploadCloud, FiActivity } from 'react-icons/fi'
import { FaFlask } from 'react-icons/fa'
import { useAPI } from '../context/APIContext'

interface PredictionResult {
  predictedClass: string
  confidence: number
  eosinophilProb: number
  lymphocyteProb: number
  monocyteProb: number
  neutrophilProb: number
}

export default function Classify() {
  const { predict, isLoading, error } = useAPI()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [localError, setLocalError] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setLocalError('')
      setResult(null)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setLocalError('')
      setResult(null)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClassify = async () => {
    if (!imageFile) {
      setLocalError('Please upload an image first')
      return
    }

    setLocalError('')
    try {
      const prediction = await predict(imageFile)
      setResult(prediction)
    } catch (err) {
      setLocalError('Classification failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with proper padding & max width */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Upload & Results Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16">
        {/* LEFT: Upload Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">UPLOAD IMAGE</h2>
          <p className="text-gray-600 text-sm mb-6">Upload a blood smear image to classify white blood cells.</p>
          
          {!preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-300 hover:border-cyan-500 hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-400 text-3xl">
                      <FiUploadCloud />
                    </div>
                  </div>
                  <p className="text-gray-900 font-semibold">Drop your image here</p>
                  <p className="text-sm text-gray-600 mt-2">or click to browse files</p>
                  <p className="text-xs text-gray-500 mt-3">Supports JPEG, PNG • Blood cell microscopy recommended</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="rounded-lg overflow-hidden bg-gray-100">
                <img src={preview} alt="Blood cell" className="w-full h-auto" />
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{imageFile?.name}</p>
                  <p className="text-xs text-gray-600">{((imageFile?.size || 0) / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => {
                    setImageFile(null)
                    setPreview('')
                    setResult(null)
                    setLocalError('')
                  }}
                  className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold"
                >
                  Change
                </button>
              </div>

              {/* Classify Button */}
              {!result && (
                <button
                  onClick={handleClassify}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <FiActivity className="w-5 h-5" /> {isLoading ? 'Classifying...' : 'Classify Blood Cell'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Results Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">RESULTS</h2>
          <p className="text-gray-600 text-sm mb-6">Classification output and confidence scores.</p>

          {localError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {localError}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {result ? (
            <div className="space-y-6">
              {/* Top: Predicted Class + Circular Confidence */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Detected Cell Type</p>
                  <h3 className="text-3xl font-bold text-cyan-600">{result.predictedClass.toUpperCase()}</h3>
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                    {result.predictedClass === 'neutrophil' && 'Multi-lobed nucleus with fine pink granules. Most abundant WBC; first responder to bacterial infection.'}
                    {result.predictedClass === 'lymphocyte' && 'Large nucleus relative to cell size with scant cytoplasm. Essential for adaptive immunity.'}
                    {result.predictedClass === 'monocyte' && 'Kidney-shaped nucleus with abundant cytoplasm. Differentiates into macrophages.'}
                    {result.predictedClass === 'eosinophil' && 'Bilobed nucleus with large pink/red cytoplasmic granules. Key in allergic reactions.'}
                  </p>
                </div>

                {/* Circular Confidence */}
                <div className="flex flex-col items-center justify-start">
                  <div className="relative w-32 h-32 rounded-full border-4 border-cyan-500 flex items-center justify-center bg-white">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-600">{(result.confidence * 100).toFixed(0)}%</p>
                      <p className="text-xs text-gray-600 font-medium">confidence</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Probabilities */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">All Class Probabilities</p>
                <div className="space-y-3">
                  {[
                    { label: 'NEUTROPHIL', prob: result.neutrophilProb, color: 'bg-teal-500' },
                    { label: 'MONOCYTE', prob: result.monocyteProb, color: 'bg-orange-500' },
                    { label: 'EOSINOPHIL', prob: result.eosinophilProb, color: 'bg-red-500' },
                    { label: 'LYMPHOCYTE', prob: result.lymphocyteProb, color: 'bg-blue-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-semibold text-gray-700">{item.label}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${item.color} h-full transition-all`}
                          style={{ width: `${item.prob * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-right text-xs font-bold text-cyan-600">
                        {(item.prob * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detection Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">Detection Info</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Bounding Box</p>
                    <p className="text-sm font-semibold text-gray-900">(0.0%, 0.0%)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Cell Size</p>
                    <p className="text-sm font-semibold text-gray-900">100.0% × 100.0%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Detection Confidence</p>
                    <p className="text-sm font-semibold text-gray-900">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Processed</p>
                    <p className="text-sm font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setImageFile(null)
                  setPreview('')
                  setResult(null)
                  setLocalError('')
                }}
                className="w-full px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition text-sm"
              >
                Analyze Another Image
              </button>
            </div>
          ) : (
            <div className="h-80 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="mb-3 flex justify-center">
                <div className="text-5xl text-gray-400 opacity-60"><FaFlask /></div>
              </div>
              <p className="text-gray-700 font-semibold">Results will appear here after analysis</p>
              <p className="text-sm text-gray-600 mt-2">Upload an image and click Classify</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Recognizable Cell Types Section */}
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-gray-200 mt-4">
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-wide">Recognizable Cell Types</h3>
          
          <div className="grid grid-cols-4 gap-6">
            {/* Eosinophil */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h4 className="font-bold text-gray-900">EOSINOPHIL</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bilobed nucleus with large pink/red cytoplasmic granules. Key in allergic reactions and parasitic infections.
              </p>
            </div>

            {/* Lymphocyte */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h4 className="font-bold text-gray-900">LYMPHOCYTE</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Large nucleus relative to cell size with scant cytoplasm. Essential for adaptive immunity (B and T cells).
              </p>
            </div>

            {/* Monocyte */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <h4 className="font-bold text-gray-900">MONOCYTE</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kidney-shaped nucleus with abundant cytoplasm. Differentiates into macrophages and dendritic cells.
              </p>
            </div>

            {/* Neutrophil */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <h4 className="font-bold text-gray-900">NEUTROPHIL</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Multi-lobed nucleus with fine pink granules. Most abundant WBC; first responder to bacterial infection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
