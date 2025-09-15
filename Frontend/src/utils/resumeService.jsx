export const getAllResumes = () => {
  const resumes = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('resume_')) {
      const resumeData = JSON.parse(localStorage.getItem(key));
      resumes.push({ id: key, ...resumeData });
    }
  }
  return resumes.sort((a, b) => b.id.localeCompare(a.id));
};

export const getResumeById = (id) => {
  const resumeDataString = localStorage.getItem(id);
  return resumeDataString ? JSON.parse(resumeDataString) : null;
};

export const saveResume = (id, data) => {
  const resumeId = (id && id !== 'new') ? id : `resume_${Date.now()}`;
  localStorage.setItem(resumeId, JSON.stringify(data));
  return resumeId; 
};

export const deleteResumeById = (id) => {
  localStorage.removeItem(id);
};