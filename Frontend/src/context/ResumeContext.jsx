import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getResumeById } from '../utils/resumeService';
const ResumeContext = createContext();

export function useResume() {
  return useContext(ResumeContext);
}

const initialData = {
  resumeTitle: "Untitled Resume",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  mobile: "9876543210",
  countryCode: "+91",
  linkedin: "linkedin.com/in/janedoe",
  gitlab: "gitlab.com/janedoe",
  education: {
    tenth: { marks: "98%", college: "Oakridge International", year: "2018" },
    twelth: { marks: "96%", college: "Oakridge International", year: "2020" },
    ug: { marks: "9.1 CGPA", college: "National Institute of Technology", year: "2024" },
    pg: { marks: "", college: "", year: "" },
  },
  skills: ["React", "TypeScript", "GraphQL", "Figma", "Next.js"],
  skillInput: "",
  experience: "Frontend Developer Intern at Google (Summer 2023)\n- Collaborated on the Google Photos interface, improving component load times by 15%.",
  projects: [{ title: "AI Resume Builder", description: "Developed a web application using React to help users create professional resumes." }],
  achievements: "Winner, Smart India Hackathon 2022",
  certifications: "AWS Certified Cloud Practitioner",
};

export default function ResumeProvider({ children,resumeId  }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateFromUrl = queryParams.get('template');
  const [formData, setFormData] = useState(initialData);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false); 
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    useEffect(() => {
    if (resumeId === 'new') {
      setFormData(initialData);
    } else if (resumeId) {
      const savedData = getResumeById(resumeId);
      if (savedData) {
        setFormData(savedData); // Load the correct data
      } else {
        console.error(`No resume found for ID: ${resumeId}. Starting a new one.`);
        setFormData(initialData);
      }
    }
  }, [resumeId]);

  const [selectedTemplate, setSelectedTemplate] = useState(templateFromUrl || 'onyx'); 
  const [themeColor, setThemeColor] = useState('#0d6efd'); 
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [fontSize, setFontSize] = useState(1); 
  
  const value = {
    formData,setFormData,resumeId,
    selectedTemplate,setSelectedTemplate,
    themeColor, setThemeColor, 
    fontFamily, setFontFamily,
    fontSize, setFontSize,
    isPreviewVisible,setIsPreviewVisible,
    isToolbarVisible, setIsToolbarVisible,
  };
  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}
