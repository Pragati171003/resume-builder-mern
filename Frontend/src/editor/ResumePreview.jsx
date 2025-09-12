import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';
import  { mapFormDataToSchema }  from '../utils/dataMapper'; 
import LoadingSpinner from '../utils/LoadingSpinner';

function ResumePreview() {
  const { formData, selectedTemplate } = useResume();
  const [renderedHtml, setRenderedHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!formData?.name || !selectedTemplate) return;
    const renderResume = async () => {
      setIsLoading(true);
      try {
        const mappedData = mapFormDataToSchema(formData);
        const response = await axios.post('http://localhost:4000/render', { resume: mappedData, theme: selectedTemplate });
        setRenderedHtml(response.data);
      } catch (error) {
        console.error("Error fetching rendered resume:", error);
        setRenderedHtml('<div style="padding:40px;color:red;"><h3>Error Loading Theme</h3><p>Is the renderer server running?</p></div>');
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => { renderResume(); }, 500);
    return () => clearTimeout(timer);
  }, [formData, selectedTemplate]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <iframe 
        id="resume-preview-iframe" 
        srcDoc={renderedHtml}
        title="Resume Preview"
        sandbox="allow-same-origin allow-scripts"
        style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}
export default ResumePreview;