import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getResumeById } from '../utils/resumeService';

const ResumeContext = createContext();
export function useResume() { return useContext(ResumeContext); }
const initialData = {
  resumeTitle: "Untitled Resume",
  name: "Alex Chen",
  email: "alex.chen@example.com",
  mobile: "9876543210",
  countryCode: "+91",
  linkedin: "linkedin.com/in/alexchen-dev",
  gitlab: "gitlab.com/alexchen",
  careerObjective: "Results-driven Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable, cloud-native applications. Proven expertise in full-stack development, microservices architecture, and leading agile teams to deliver high-quality software products.",
  
  education: {
    tenth: { 
      marks: "95%", 
      school: "St. Xavier's High School", 
      year: "2010" 
    },
    twelth: { 
      marks: "92%", 
      college: "Delhi Public School", 
      year: "2012" 
    },
    ug: { 
      marks: "8.8 CGPA", 
      college: "National Institute of Technology", 
      year: "2016" 
    },
    pg: { 
      marks: "3.9 GPA", 
      college: "Stanford University", 
      year: "2018" 
    },
  },

  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Python",
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "CI/CD"
  ],
  skillInput: "",

  experience: [
    { 
      role: "Senior Software Engineer", 
      company: "InnovateTech Solutions", 
      years: "2020 - Present", 
      description: "- Led the backend team in developing a new microservices-based platform, reducing API latency by 40%.\n- Mentored 5 junior engineers, improving team productivity and code quality.\n- Architected and implemented a CI/CD pipeline using Jenkins and Docker, reducing deployment time by 75%."
    },
    {
      role: "Software Engineer",
      company: "DataStream Analytics",
      years: "2016 - 2020",
      description: "- Developed and maintained data processing pipelines using Python and SQL, improving data accuracy by 15%.\n- Built and scaled RESTful APIs serving over 1 million requests per day."
    }
  ],

  projects: [
    { 
      title: "Orchestration Engine for Cloud Deployments", 
      description: "Designed and built a platform-agnostic orchestration tool using Go and Kubernetes to automate application deployments, which is now used by over 20 teams internally." 
    },
    {
      title: "Real-Time Analytics Dashboard",
      description: "Developed a full-stack dashboard using React, Node.js, and WebSockets to visualize live user engagement data, providing key insights to the product team."
    }
  ],
  
  achievements: "Published author on the 'Cloud-Native Weekly' tech blog; Speaker at the National Developer Conference 2023.",
  certifications: "AWS Certified Solutions Architect – Associate; Certified Kubernetes Application Developer (CKAD)",
};
export default function ResumeProvider({ children }) {
const { resumeId } = useParams();
const location = useLocation();
const [formData, setFormData] = useState(initialData);
const [selectedTemplate, setSelectedTemplate] = useState('onepage-plus');
const [themeColor, setThemeColor] = useState('#0d6efd');
const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
const [fontSize, setFontSize] = useState(1);
const [isToolbarVisible, setIsToolbarVisible] = useState(false);
const [isPreviewVisible, setIsPreviewVisible] = useState(true);
useEffect(() => {
if (resumeId === 'new') {
const queryParams = new URLSearchParams(location.search);
const templateFromUrl = queryParams.get('template');
if (templateFromUrl) setSelectedTemplate(templateFromUrl);
setFormData(initialData);
} else if (resumeId) {
const savedData = getResumeById(resumeId);
if (savedData) {
savedData.experience = Array.isArray(savedData.experience) ? savedData.experience : [];
savedData.projects = Array.isArray(savedData.projects) ? savedData.projects : [];
setFormData(savedData);
}
}
}, [resumeId, location.search]);
const value = {
formData, setFormData, resumeId, selectedTemplate, setSelectedTemplate,
themeColor, setThemeColor, fontFamily, setFontFamily, fontSize, setFontSize,
isToolbarVisible, setIsToolbarVisible, isPreviewVisible, setIsPreviewVisible,
};
return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}