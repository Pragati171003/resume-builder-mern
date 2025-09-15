import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';
import  { mapFormDataToSchema }  from '../utils/dataMapper'; 
import LoadingSpinner from '../utils/LoadingSpinner';

function ResumePreview() {
  const { formData, selectedTemplate, themeColor, fontFamily, fontSize,previewRef  } = useResume();
  const [renderedHtml, setRenderedHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedTemplate) {
      setRenderedHtml('<div style="padding:40px; text-align:center;"><p>Please select a template to begin.</p></div>');
      return;
    }

    const renderResume = async () => {
      setIsLoading(true); 
      try {
        const mappedData = mapFormDataToSchema(formData, selectedTemplate,  {themeColor, fontFamily, fontSize} );
        const response = await axios.post('http://localhost:4000/render', {
          resume: mappedData,
          theme: selectedTemplate,
        });
        setRenderedHtml(response.data);
      } catch (error) {
        console.error("Error fetching rendered resume:", error);
        setRenderedHtml('<div style="padding:40px; text-align:center; color:red;"><h3>Error Loading Theme</h3><p>Is the rendering server running on port 4000? Check its console for errors.</p></div>');
      } finally {
        setIsLoading(false); 
      }
    };
    const timer = setTimeout(() => { renderResume(); }, 500);
    return () => clearTimeout(timer);

  }, [formData, selectedTemplate,themeColor, fontFamily, fontSize]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <iframe 
      id="resume-preview-iframe"
      ref={previewRef}
      srcDoc={renderedHtml}
      title="Resume Preview"
      sandbox="allow-same-origin allow-scripts"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}

export default ResumePreview;