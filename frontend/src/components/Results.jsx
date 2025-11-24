function Results({ analysis }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'
    if (score >= 60) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className="results">
      <div className="score-section">
        <div className="score-circle" style={{ borderColor: getScoreColor(analysis.score) }}>
          <span className="score-number">{analysis.score}</span>
          <span className="score-label">/ 100</span>
        </div>
        <h2>Resume Analysis</h2>
      </div>

      <div className="feedback-section">
        <h3>Overall Feedback</h3>
        <p className="feedback-text">{analysis.overallFeedback}</p>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card strengths">
          <h4>💪 Strengths</h4>
          <ul>
            {analysis.strengths?.map((strength, i) => (
              <li key={i} className="strength-item">{strength}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card weaknesses">
          <h4>⚠️ Areas for Improvement</h4>
          <ul>
            {analysis.weaknesses?.map((weakness, i) => (
              <li key={i} className="weakness-item">{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card suggestions">
          <h4>💡 Suggestions</h4>
          <ul>
            {analysis.suggestions?.map((suggestion, i) => (
              <li key={i} className="suggestion-item">{suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card sections">
          <h4>📋 Resume Sections</h4>
          <ul>
            {Object.entries(analysis.sections || {}).map(([section, found]) => (
              <li key={section} className={found ? 'found' : 'missing'}>
                {section.charAt(0).toUpperCase() + section.slice(1)}: {found ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </div>

        <div className="analysis-card keywords">
          <h4>🔑 Key Skills Detected</h4>
          <div className="keywords">
            {analysis.keywords?.length > 0 ? (
              analysis.keywords.map((keyword, i) => (
                <span key={i} className="keyword-tag">{keyword}</span>
              ))
            ) : (
              <p>No specific keywords detected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results