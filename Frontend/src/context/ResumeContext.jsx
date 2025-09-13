import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getResumeById } from '../utils/resumeService';

const ResumeContext = createContext();
export function useResume() { return useContext(ResumeContext); }
const initialData = {
resumeTitle: "Untitled Resume",
name: "",
email: "",
mobile: "",
countryCode: "+91",
linkedin: "",
gitlab: "",
careerObjective: "",
education: {
tenth: { marks: "", school: "", year: "" },
twelth: { marks: "", college: "", year: "" },
ug: { marks: "", college: "", year: "" },
pg: { marks: "", college: "", year: "" },
},
skills: [],
skillInput: "",
experience: [], 
projects: [], 
achievements: "",
certifications: "",
};
export default function ResumeProvider({ children }) {
const { resumeId } = useParams();
const location = useLocation();
const [formData, setFormData] = useState(initialData);
const [selectedTemplate, setSelectedTemplate] = useState('flat');
const [themeColor, setThemeColor] = useState('#0d6efd');
const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
const [fontSize, setFontSize] = useState(1);
const [isToolbarVisible, setIsToolbarVisible] = useState(false);
const [isPreviewVisible, setIsPreviewVisible] = useState(false);
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