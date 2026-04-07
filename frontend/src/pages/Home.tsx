import { Link } from 'react-router-dom'

// Icon Components
const LightningIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const BarChartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const StorageIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l8-4 8 4M4 7h16" />
  </svg>
)

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-linear-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="text-center max-w-3xl px-6 py-12">
        <div className="mb-6">
          <div className="inline-block p-4 bg-cyan-100 rounded-full mb-4">
            <span className="text-4xl">🔬</span>
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Blood Cell Classification
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Powered by Advanced CNN Deep Learning
        </p>
        <p className="text-lg text-gray-500 mb-12 leading-relaxed">
          Upload a blood smear microscopy image to automatically classify white blood cells with high accuracy. Our trained model recognizes Eosinophils, Lymphocytes, Monocytes, and Neutrophils.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/classify"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
          >
            Start Classifying →
          </Link>
          <Link
            to="/results"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition"
          >
            View Past Results
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="text-orange-300 mb-3 flex justify-center"><LightningIcon /></div>
            <h3 className="font-bold text-gray-900 mb-2">Real-Time</h3>
            <p className="text-gray-600 text-sm">Classification in &lt;500ms</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="text-cyan-300 mb-3 flex justify-center"><BarChartIcon /></div>
            <h3 className="font-bold text-gray-900 mb-2">Accurate</h3>
            <p className="text-gray-600 text-sm">72.98% accuracy on test set</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="text-purple-300 mb-3 flex justify-center"><StorageIcon /></div>
            <h3 className="font-bold text-gray-900 mb-2">Storage</h3>
            <p className="text-gray-600 text-sm">Unlimited history tracking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
