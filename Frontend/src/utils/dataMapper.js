export const mapFormDataToSchema = (formData,selectedTemplate) => {
  const safe = (value) => value || '';
  let mappedData = {
    basics: {
      name: safe(formData.name),
      label: "Senior Software Engineer", 
      summary: safe(formData.careerObjective),   
      summaryBlock:safe(formData.careerObjective), 
      about: safe(formData.careerObjective),
      email: safe(formData.email),
      phone: safe(formData.mobile),
      location: {
        address: safe(formData.location?.address), 
        city: safe(formData.location?.city),
      },
      profiles: [],
    },
    work: (formData.experience || []).map(exp => ({
      company: safe(exp.company),
      position: safe(exp.role),
      summary: safe(exp.description),
      startDate: safe(exp.years) || '2020-01-01', 
      endDate: 'Present',
    })),
    education: [],
    skills: (formData.skills || []).length > 0 
      ? [{ name: "Core Skills", keywords: formData.skills }] 
      : [],
    projects: (formData.projects || []).map(proj => ({
      name: safe(proj.title),
      description: safe(proj.description),
    })),
    awards: formData.achievements ? [{ title: safe(formData.achievements) }] : [],
    certificates: formData.certifications ? [{ name: safe(formData.certifications) }] : [],
  };

  if (mappedData.work.length === 0) {
    mappedData.work.push({ company: '', position: '', summary: '', startDate: '' });
  }
  if (mappedData.projects.length === 0) {
    mappedData.projects.push({ name: '', description: '' });
  }
   if (selectedTemplate === 'tech') {
    console.log("Applying magnificent override for 'tech' theme...");
    mappedData.basics.label = "Senior Software Engineer";
    mappedData.basics.summary = safe(formData.careerObjective);
  }
  if (formData.linkedin) mappedData.basics.profiles.push({ network: "LinkedIn", url: formData.linkedin });
  if (formData.gitlab) mappedData.basics.profiles.push({ network: "GitLab", url: formData.gitlab });
  if (formData.education?.ug?.college) mappedData.education.push({ institution: safe(formData.education.ug.college), gpa: safe(formData.education.ug.marks), endDate: safe(formData.education.ug.year), studyType: "Undergraduate" });
  if (formData.education?.twelth?.college) mappedData.education.push({ institution: safe(formData.education.twelth.college), gpa: safe(formData.education.twelth.marks), endDate: safe(formData.education.twelth.year), studyType: "High School" });
  
  return mappedData;
};