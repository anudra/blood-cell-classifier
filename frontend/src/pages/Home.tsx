import { Link } from 'react-router-dom'
import { FiZap, FiBarChart2, FiDatabase } from 'react-icons/fi'

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
            <div className="text-orange-400 mb-3 flex justify-center text-2xl"><FiZap /></div>
            <h3 className="font-bold text-gray-900 mb-2">Real-Time</h3>
            <p className="text-gray-600 text-sm">Classification in &lt;500ms</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="text-cyan-400 mb-3 flex justify-center text-2xl"><FiBarChart2 /></div>
            <h3 className="font-bold text-gray-900 mb-2">Accurate</h3>
            <p className="text-gray-600 text-sm\">72.98% accuracy on test set</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="text-purple-400 mb-3 flex justify-center text-2xl"><FiDatabase /></div>
            <h3 className="font-bold text-gray-900 mb-2\">Storage</h3>
            <p className="text-gray-600 text-sm\">Unlimited history tracking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
