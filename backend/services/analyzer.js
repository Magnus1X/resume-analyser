import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export async function analyzeResume(content) {
  console.log('Starting resume analysis...');
  
  if (!openai) {
    console.log('OpenAI not configured, using fallback analysis');
    return fallbackAnalysis(content);
  }
  
  try {
    console.log('Calling OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: `You are an expert HR professional and resume analyst. Analyze the resume and return ONLY valid JSON with this structure:
{
  "score": 75,
  "strengths": ["Clear contact information provided", "Relevant work experience included", "Technical skills clearly listed", "Professional formatting maintained"],
  "weaknesses": ["Missing professional summary", "Limited quantifiable achievements", "Could benefit from more action verbs"],
  "suggestions": ["Add a compelling professional summary at the top", "Include specific metrics and percentages in achievements", "Use stronger action verbs like 'implemented', 'optimized', 'led'", "Add relevant certifications if available", "Ensure consistent formatting throughout"],
  "sections": {
    "contact": true,
    "summary": false,
    "experience": true,
    "education": true,
    "skills": true
  },
  "keywords": ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS", "Docker"],
  "overallFeedback": "This resume demonstrates solid technical skills and relevant experience. The structure is clear and professional, making it easy for recruiters to scan. However, adding quantifiable achievements and a professional summary would significantly enhance its impact and ATS compatibility.",
  "detailedAnalysis": {
    "formatting": "Clean, professional layout with consistent formatting. Good use of white space and clear section headers.",
    "content": "Strong technical background evident. Work experience shows progression but could benefit from more specific achievements and metrics.",
    "atsCompatibility": "Good keyword presence for technical roles. Standard formatting should parse well through ATS systems.",
    "professionalImpact": "Solid foundation that effectively communicates technical competency. Adding quantified results would increase market appeal."
  },
  "experienceAnalysis": {
    "yearsOfExperience": "3-5 years",
    "careerProgression": "Shows steady growth in technical responsibilities",
    "achievementQuality": "Good foundation but needs more quantifiable results"
  },
  "improvementPriority": ["Add professional summary with key value proposition", "Include specific metrics and achievements in work experience", "Optimize keywords for target job descriptions"]
}`
      }, {
        role: "user",
        content: `Analyze this resume and provide detailed feedback:\n\n${content}`
      }],
      temperature: 0.3,
      max_tokens: 2500
    });

    console.log('OpenAI response received');
    const responseText = response.choices[0].message.content.trim();
    console.log('Response text:', responseText.substring(0, 200) + '...');
    
    let analysis;
    try {
      analysis = JSON.parse(responseText);
      console.log('Successfully parsed JSON response');
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.log('Raw response:', responseText);
      return fallbackAnalysis(content);
    }
    
    // Validate and ensure all required fields
    const completeAnalysis = {
      score: typeof analysis.score === 'number' ? analysis.score : 65,
      strengths: Array.isArray(analysis.strengths) && analysis.strengths.length > 0 ? analysis.strengths : ["Resume successfully processed", "Basic structure is present"],
      weaknesses: Array.isArray(analysis.weaknesses) && analysis.weaknesses.length > 0 ? analysis.weaknesses : ["Detailed analysis requires review"],
      suggestions: Array.isArray(analysis.suggestions) && analysis.suggestions.length > 0 ? analysis.suggestions : ["Consider professional review", "Add more specific details"],
      sections: analysis.sections || {
        contact: true,
        summary: false,
        experience: true,
        education: true,
        skills: true
      },
      keywords: Array.isArray(analysis.keywords) ? analysis.keywords : [],
      overallFeedback: analysis.overallFeedback || "Professional resume analysis completed with AI-powered insights.",
      detailedAnalysis: analysis.detailedAnalysis || {
        formatting: "Professional formatting analysis completed",
        content: "Content quality assessment performed",
        atsCompatibility: "ATS compatibility evaluated",
        professionalImpact: "Market appeal assessment completed"
      },
      experienceAnalysis: analysis.experienceAnalysis || {
        yearsOfExperience: "Experience level assessed",
        careerProgression: "Career growth evaluated",
        achievementQuality: "Achievement quality reviewed"
      },
      improvementPriority: Array.isArray(analysis.improvementPriority) ? analysis.improvementPriority : ["Focus on key improvements", "Enhance content quality", "Optimize for target roles"]
    };
    
    console.log('Analysis completed successfully');
    return completeAnalysis;
  } catch (error) {
    console.error('OpenAI analysis error:', error.message);
    return fallbackAnalysis(content);
  }
}

function fallbackAnalysis(content) {
  const sections = {
    contact: /email|phone|linkedin|github|@/i.test(content),
    summary: /summary|objective|profile|about/i.test(content),
    experience: /experience|work|employment|job|position|role/i.test(content),
    education: /education|degree|university|college|school|bachelor|master|phd/i.test(content),
    skills: /skills|technologies|tools|programming|software|technical/i.test(content)
  };
  
  // Extract potential keywords
  const techKeywords = content.match(/\b(JavaScript|Python|Java|React|Node|SQL|AWS|Docker|Git|HTML|CSS|Angular|Vue|TypeScript|C\+\+|C#|PHP|Ruby|Go|Kubernetes|MongoDB|PostgreSQL|MySQL|Redis|Linux|Windows|MacOS|Agile|Scrum|DevOps|CI\/CD|REST|API|JSON|XML|Bootstrap|jQuery|Express|Django|Flask|Spring|Laravel|Rails|Symfony|Unity|Unreal|Photoshop|Illustrator|Figma|Sketch|Adobe|Microsoft Office|Excel|PowerPoint|Word|Outlook|Salesforce|HubSpot|Google Analytics|SEO|SEM|PPC|Social Media|Marketing|Sales|Management|Leadership|Project Management|Data Analysis|Machine Learning|AI|Artificial Intelligence|Deep Learning|TensorFlow|PyTorch|Pandas|NumPy|Matplotlib|Tableau|Power BI|Excel|VBA|R|MATLAB|Stata|SPSS)\b/gi) || [];
  
  const uniqueKeywords = [...new Set(techKeywords.map(k => k.toLowerCase()))];
  
  const sectionCount = Object.values(sections).filter(Boolean).length;
  let score = sectionCount * 15;
  
  if (content.length > 500) score += 10;
  if (uniqueKeywords.length > 5) score += 10;
  if (/\d+\s*(years?|months?)/.test(content)) score += 5;
  if (/\d+%|\$\d+|\d+k|increased|improved|reduced|achieved/.test(content)) score += 10;
  
  score = Math.min(score, 75);
  
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];
  
  if (sections.contact) {
    strengths.push("Contact information is present and accessible");
  } else {
    weaknesses.push("Missing or unclear contact information");
    suggestions.push("Add clear contact details including email, phone, and LinkedIn profile");
  }
  
  if (sections.experience) {
    strengths.push("Work experience section is included");
    if (/\d+\s*(years?|months?)/.test(content)) {
      strengths.push("Experience duration is mentioned");
    }
  } else {
    weaknesses.push("Work experience section appears to be missing");
    suggestions.push("Add detailed work experience with job titles, companies, and dates");
  }
  
  if (sections.skills) {
    strengths.push("Technical skills section is present");
    if (uniqueKeywords.length > 8) {
      strengths.push(`Strong technical keyword presence (${uniqueKeywords.length} skills detected)`);
    }
  } else {
    weaknesses.push("Skills section is not clearly defined");
    suggestions.push("Add a dedicated skills section with relevant technical and soft skills");
  }
  
  if (sections.education) {
    strengths.push("Educational background is included");
  } else {
    weaknesses.push("Education section appears to be missing");
    suggestions.push("Include educational qualifications, degrees, and certifications");
  }
  
  if (!sections.summary) {
    weaknesses.push("Professional summary or objective statement is missing");
    suggestions.push("Add a compelling professional summary highlighting your key strengths");
  }
  
  if (content.length < 300) {
    weaknesses.push("Resume content appears to be too brief");
    suggestions.push("Expand content with more detailed descriptions of experience and achievements");
  }
  
  if (!/\d+%|\$\d+|\d+k|increased|improved|reduced|achieved|managed|led|developed|created|implemented/.test(content)) {
    weaknesses.push("Lack of quantifiable achievements and action verbs");
    suggestions.push("Include specific metrics, percentages, and dollar amounts to quantify your impact");
  }
  
  if (strengths.length === 0) strengths.push("Resume file was successfully processed");
  if (weaknesses.length === 0) weaknesses.push("Limited analysis available without AI processing");
  if (suggestions.length === 0) suggestions.push("Consider enabling AI analysis for detailed recommendations");
  
  return {
    score,
    strengths,
    weaknesses,
    suggestions,
    sections,
    keywords: uniqueKeywords.slice(0, 15),
    overallFeedback: `Basic analysis completed with ${sectionCount}/5 key sections detected. The resume shows ${score >= 60 ? 'good' : 'moderate'} structure with ${uniqueKeywords.length} technical keywords identified. For comprehensive AI-powered analysis including detailed formatting, ATS compatibility, and industry-specific recommendations, please ensure OpenAI API is properly configured.`,
    detailedAnalysis: {
      formatting: "Unable to analyze formatting details without AI processing. Consider checking for consistent fonts, proper spacing, and clean layout.",
      content: `Content analysis shows ${content.length} characters with ${uniqueKeywords.length} technical terms detected. ${/\d+%|\$\d+|increased|improved/.test(content) ? 'Some quantifiable achievements found.' : 'Consider adding more specific metrics and achievements.'}`,
      atsCompatibility: "Basic keyword analysis completed. For detailed ATS compatibility assessment, AI analysis is recommended.",
      professionalImpact: "Professional impact assessment requires AI analysis for comprehensive evaluation of market appeal and industry alignment."
    },
    experienceAnalysis: {
      yearsOfExperience: /\d+\s*years?/.test(content) ? content.match(/\d+\s*years?/)[0] : "Not clearly specified",
      careerProgression: "Career progression analysis requires AI processing for detailed evaluation",
      achievementQuality: /\d+%|\$\d+|increased|improved|reduced|achieved/.test(content) ? "Some quantifiable achievements detected" : "Limited quantifiable achievements found"
    },
    improvementPriority: [
      !sections.summary ? "Add professional summary section" : "Enhance existing content with more details",
      uniqueKeywords.length < 5 ? "Include more relevant technical keywords" : "Optimize keyword placement and density",
      !/\d+%|\$\d+/.test(content) ? "Add quantifiable achievements and metrics" : "Improve formatting and visual presentation"
    ]
  };
}