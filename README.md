# Resume Analyser

A full-stack web application that analyzes resumes and provides AI-powered feedback and scoring.

## Features

- **File Upload**: Drag-and-drop or click to upload PDF, DOC, DOCX, or TXT files
- **Resume Analysis**: Automated analysis of resume sections, keywords, and structure
- **Scoring System**: 0-100 score based on resume quality metrics
- **Detailed Feedback**: Specific suggestions for improvement
- **Modern UI**: Responsive React interface with smooth animations

## Tech Stack

### Frontend
- React 18 with Vite
- Vanilla CSS with modern styling
- Axios for API calls
- Responsive design

### Backend
- Node.js with Express
- Prisma ORM with MongoDB
- Multer for file uploads
- PDF parsing capabilities

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Setup environment variables:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URL
   ```

3. **Generate Prisma client:**
   ```bash
   cd backend
   npm run db:generate
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

## API Endpoints

- `POST /api/upload` - Upload and analyze resume
- `GET /api/resume/:id` - Get resume analysis by ID

## Analysis Features

- **Section Detection**: Contact info, summary, experience, education, skills
- **Keyword Extraction**: Technical skills and relevant terms
- **Experience Analysis**: Years of experience and quantifiable achievements
- **Education Verification**: Degree and GPA mentions
- **Scoring Algorithm**: Comprehensive scoring based on multiple factors

## Usage

1. Open the application in your browser
2. Upload your resume using drag-and-drop or file picker
3. Wait for analysis to complete
4. Review your score and detailed feedback
5. Implement suggested improvements

## Future Enhancements

- Integration with job posting APIs for targeted analysis
- ATS (Applicant Tracking System) compatibility checking
- Industry-specific analysis templates
- Resume template suggestions
- Export analysis reports