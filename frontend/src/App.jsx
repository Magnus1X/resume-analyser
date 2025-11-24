import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UploadPage from './components/UploadPage'
import AnalysisPage from './components/AnalysisPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('upload')
  const [analysis, setAnalysis] = useState(null)
  const [fileName, setFileName] = useState('')

  const handleAnalysisComplete = (analysisData, file) => {
    setAnalysis(analysisData)
    setFileName(file.name)
    setCurrentPage('analysis')
  }

  const handleBackToUpload = () => {
    setCurrentPage('upload')
    setAnalysis(null)
    setFileName('')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentPage === 'upload' && (
          <UploadPage 
            key="upload"
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}
        {currentPage === 'analysis' && (
          <AnalysisPage 
            key="analysis"
            analysis={analysis}
            fileName={fileName}
            onBack={handleBackToUpload}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App