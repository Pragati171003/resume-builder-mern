export const mapFormDataToSchema = (formData,selectedTemplate,themeOptions) => {
  const safe = (value) => value || '';
const { themeColor, fontFamily, fontSize } = themeOptions || {};
const fontImport = fontFamily ? `@import url('https://fonts.googleapis.com/css2?family=${fontFamily.split(',')[0].replace(/'/g, '').replace(' ', '+')}:wght@400;700&display=swap');` : '';
  let mappedData = {
    meta: {
      theme: selectedTemplate,
      css: `
        /* We import the magnificent Google Font first */
        ${fontImport}

        /* We only apply the overrides if a choice has been made */
        ${themeColor ? `h1, h2, h3, a { color: ${themeColor} !important; }` : ''}
        ${fontFamily ? `body, h1, h2, h3, p, li, span { font-family: ${fontFamily} !important; }` : ''}
        ${fontSize ? `body { font-size: ${fontSize}rem !important; }` : ''}
      `
    },
    basics: {
      name: safe(formData.name),
      label: safe(formData.label), 
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
    references: [],
    volunteer: [],
    publications: [],
  };

  if (mappedData.work.length === 0) {
    mappedData.work.push({ company: '', position: '', summary: '', startDate: '' });
  }
  if (mappedData.projects.length === 0) {
    mappedData.projects.push({ name: '', description: '' });
  }

  (formData.customSections || []).forEach(section => {
    const sectionTitle = (section.title || '').toLowerCase();
    switch (sectionTitle) {
      case 'references':
        mappedData.references.push({
          reference: safe(section.content),
        });
        break;
      
      case 'volunteer work':
      case 'volunteering':
        mappedData.volunteer.push({
          organization: safe(section.title),
          summary: safe(section.content),
        });
        break;
      case 'publications':
        mappedData.publications.push({
          name: safe(section.title),
          summary: safe(section.content),
        });
        break;
      default:
        mappedData.awards.push({
          title: safe(section.title),
          summary: safe(section.content),
        });
        break;
    }
  });

   if (selectedTemplate === 'tech') {
    console.log("Applying magnificent override for 'tech' theme...");
    mappedData.basics.summary = safe(formData.careerObjective);
  }
  if (formData.linkedin) mappedData.basics.profiles.push({ network: "LinkedIn", url: formData.linkedin });
  if (formData.gitlab) mappedData.basics.profiles.push({ network: "GitLab", url: formData.gitlab });
  if (formData.education?.ug?.college) mappedData.education.push({ institution: safe(formData.education.ug.college), gpa: safe(formData.education.ug.marks), endDate: safe(formData.education.ug.year), studyType: "Undergraduate" });
  if (formData.education?.twelth?.college) mappedData.education.push({ institution: safe(formData.education.twelth.college), gpa: safe(formData.education.twelth.marks), endDate: safe(formData.education.twelth.year), studyType: "High School" });
  
  return mappedData;
};