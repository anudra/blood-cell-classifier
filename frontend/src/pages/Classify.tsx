import { useState } from 'react'

export default function Classify() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
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
      setImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main content */}
      <div className="grid grid-cols-2 gap-8 p-12 mb-12">
        {/* Upload Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">UPLOAD IMAGE</h2>
          <p className="text-gray-600 mb-6">Upload a blood smear image to classify white blood cells.</p>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
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
              <div className="text-4xl mb-3 text-gray-400">⬆️</div>
              <p className="text-gray-900 font-medium">Drop your image here</p>
              <p className="text-sm text-gray-600 mt-1">or click to browse files</p>
              <p className="text-xs text-gray-500 mt-3">Supports JPEG, PNG  Blood cell microscopy images recommended</p>
            </label>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">RESULTS</h2>
          <p className="text-gray-600 mb-6">Classification output and confidence scores.</p>
          
          {preview ? (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <img src={preview} alt="Preview" className="w-full rounded" />
              </div>
              <button className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition">
                Classify
              </button>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-5xl text-gray-300 mb-3">⚗️</div>
              <p className="text-gray-600 font-medium">Results will appear here after analysis</p>
              <p className="text-sm text-gray-500 mt-1">Upload an image and click Classify</p>
            </div>
          )}
        </div>
      </div>

      {/* Cell Types Section */}
      <div className="bg-gray-50 px-12 py-12 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-8">RECOGNIZABLE CELL TYPES</h3>
        
        <div className="grid grid-cols-4 gap-6">
          {/* Eosinophil */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <h4 className="font-bold text-gray-900">EOSINOPHIL</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bilobed nucleus with large pink/red cytoplasmic granules. Key in allergic reactions and parasitic infections.
            </p>
          </div>

          {/* Lymphocyte */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h4 className="font-bold text-gray-900">LYMPHOCYTE</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Large nucleus relative to cell size with scant cytoplasm. Essential for adaptive immunity (B and T cells).
            </p>
          </div>

          {/* Monocyte */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <h4 className="font-bold text-gray-900">MONOCYTE</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kidney-shaped nucleus with abundant cytoplasm. Differentiates into macrophages and dendritic cells.
            </p>
          </div>

          {/* Neutrophil */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
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
  )
}
