export default function Results() {
  const results = [
    {
      id: 1,
      date: '2024-04-07 10:30 AM',
      filename: 'blood_sample_01.jpg',
      cells: [
        { type: 'Neutrophil', count: 45, confidence: 0.94 },
        { type: 'Lymphocyte', count: 32, confidence: 0.91 },
        { type: 'Monocyte', count: 15, confidence: 0.88 },
        { type: 'Eosinophil', count: 8, confidence: 0.85 }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Classification Results</h1>
      <p className="text-gray-600 mb-8">View your past classification results and analysis</p>
      
      {results.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg text-gray-600">No results yet. Start classifying images to see results here.</p>
          <a href="/classify" className="mt-6 inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition">
            Go to Classify
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{result.filename}</h3>
                  <p className="text-sm text-gray-600">{result.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {result.cells.map((cell) => (
                  <div key={cell.type} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">{cell.type}</p>
                    <p className="text-2xl font-bold text-cyan-600 mb-2">{cell.count}</p>
                    <p className="text-sm text-gray-600">Confidence: {(cell.confidence * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
