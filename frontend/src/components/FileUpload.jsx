import { useState } from 'react'
import axios from 'axios'

function FileUpload({ onAnalysis, loading, setLoading }) {
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = async (files) => {
    const file = files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('resume', file)

    setLoading(true)
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onAnalysis(response.data.analysis)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error analyzing resume: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="upload-container">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="loading">
            <span>🤖 AI is analyzing your resume...</span>
          </div>
        ) : (
          <>
            <div className="upload-icon">📄</div>
            <p>Drag and drop your resume here</p>
            <p>or</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFiles(e.target.files)}
              className="file-input"
            />
            <button 
              onClick={() => document.querySelector('.file-input').click()}
              className="upload-btn"
            >
              Choose File
            </button>
            <small>Supports PDF, DOC, DOCX, TXT files</small>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUpload