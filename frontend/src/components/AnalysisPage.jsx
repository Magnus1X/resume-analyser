import { motion } from 'framer-motion'

function AnalysisPage({ analysis, fileName, onBack }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'
    if (score >= 60) return '#FF9800'
    return '#F44336'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="analysis-page"
    >
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="analysis-header"
      >
        <motion.button
          onClick={onBack}
          className="back-btn"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Upload
        </motion.button>
        <h1>Analysis Results</h1>
        <p>File: {fileName}</p>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="results"
      >
        <motion.div variants={itemVariants} className="score-section">
          <motion.div 
            className="score-circle" 
            style={{ borderColor: getScoreColor(analysis.score) }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <motion.span 
              className="score-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {analysis.score}
            </motion.span>
            <span className="score-label">/ 100</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Resume Analysis
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants} className="feedback-section">
          <h3>Overall Feedback</h3>
          <p className="feedback-text">{analysis.overallFeedback}</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="analysis-grid"
        >
          <motion.div variants={itemVariants} className="analysis-card strengths">
            <h4>💪 Strengths</h4>
            <ul>
              {analysis.strengths?.map((strength, i) => (
                <motion.li 
                  key={i} 
                  className="strength-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="analysis-card weaknesses">
            <h4>⚠️ Areas for Improvement</h4>
            <ul>
              {analysis.weaknesses?.map((weakness, i) => (
                <motion.li 
                  key={i} 
                  className="weakness-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  {weakness}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="analysis-card suggestions">
            <h4>💡 Suggestions</h4>
            <ul>
              {analysis.suggestions?.map((suggestion, i) => (
                <motion.li 
                  key={i} 
                  className="suggestion-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.1 }}
                >
                  {suggestion}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {analysis.improvementPriority && (
            <motion.div variants={itemVariants} className="analysis-card priority">
              <h4>🎯 Priority Improvements</h4>
              <ul>
                {analysis.improvementPriority?.map((priority, i) => (
                  <motion.li 
                    key={i} 
                    className="priority-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                  >
                    <span className="priority-number">{i + 1}.</span> {priority}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="analysis-card sections">
            <h4>📋 Resume Sections</h4>
            <ul>
              {Object.entries(analysis.sections || {}).map(([section, found], i) => (
                <motion.li 
                  key={section} 
                  className={found ? 'found' : 'missing'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}: {found ? '✅' : '❌'}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="analysis-card keywords">
            <h4>🔑 Key Skills Detected</h4>
            <div className="keywords">
              {analysis.keywords?.length > 0 ? (
                analysis.keywords.map((keyword, i) => (
                  <motion.span 
                    key={i} 
                    className="keyword-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {keyword}
                  </motion.span>
                ))
              ) : (
                <p>No specific keywords detected</p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {analysis.detailedAnalysis && (
          <motion.div 
            variants={itemVariants}
            className="detailed-analysis-section"
          >
            <h3>📊 Detailed Analysis</h3>
            <div className="detailed-grid">
              <motion.div variants={itemVariants} className="detail-card">
                <h5>🎨 Formatting & Presentation</h5>
                <p>{analysis.detailedAnalysis.formatting}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="detail-card">
                <h5>📝 Content Quality</h5>
                <p>{analysis.detailedAnalysis.content}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="detail-card">
                <h5>🤖 ATS Compatibility</h5>
                <p>{analysis.detailedAnalysis.atsCompatibility}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="detail-card">
                <h5>💼 Professional Impact</h5>
                <p>{analysis.detailedAnalysis.professionalImpact}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {analysis.experienceAnalysis && (
          <motion.div 
            variants={itemVariants}
            className="experience-analysis-section"
          >
            <h3>💼 Experience Analysis</h3>
            <div className="experience-grid">
              <div className="experience-item">
                <strong>Years of Experience:</strong> {analysis.experienceAnalysis.yearsOfExperience}
              </div>
              <div className="experience-item">
                <strong>Career Progression:</strong> {analysis.experienceAnalysis.careerProgression}
              </div>
              <div className="experience-item">
                <strong>Achievement Quality:</strong> {analysis.experienceAnalysis.achievementQuality}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="action-buttons"
        >
          <motion.button
            onClick={onBack}
            className="analyze-another-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Another Resume
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AnalysisPage