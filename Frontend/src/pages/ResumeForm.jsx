import React, { useState } from "react";
import "./ResumeForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveResume } from '../utils/resumeService'
import {useEffect} from 'react'
import { useResume } from '../context/ResumeContext';


const years = Array.from({ length: 28 }, (_, i) => 2000 + i); // 2000-2027

function ResumeForm({onSubmit}) {
  const navigate = useNavigate();
  const { formData, setFormData, resumeId } = useResume();
  {/*const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91", 
    linkedin: "",
    gitlab: "",
    education: {
      tenth: { marks: "", marksType: "Marks", college: "", year: 2025 },
      twelth: { marks: "", marksType: "Marks", college: "", year: 2025 },
      ug: { marks: "", marksType: "Marks", college: "", year: 2025 },
      pg: { marks: "", marksType: "Marks", college: "", year: 2025 },
    },
    skills: [],
    skillInput: "",
    experience: "",
    projects: [{ title: "", description: "" }],
    achievements: "",
    certifications: "",
  });*/}
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData((prev) => ({ ...prev, email: value.toLowerCase() }));
      return;
    }
     if (name === "mobile") {
  let digits = value.replace(/\D/g, "");

  if (digits.length > 10) return;

  setFormData((prev) => ({ ...prev, mobile: digits }));

  if (formData.countryCode === "+91") {
    if (!/^[6-9]/.test(digits) && digits.length > 0) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Indian mobile must start with digits 6–9",
      }));
    } else if (digits.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number must be exactly 10 digits",
      }));
    } else {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  } else {
    if (digits.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number must be exactly 10 digits",
      }));
    } else {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  }

  return;
}

   


    if (name === "countryCode") {
      setFormData((prev) => ({ ...prev, countryCode: value }));
      return;
    }
     if (name.startsWith("education.")) {
  const [, level, field] = name.split(".");

  if (field === "marks") {
    const numericValue = value.replace(/[^0-9.%]/g, ""); 
    const parts = numericValue.split(".");
    if (parts.length > 2) return; 

    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]: numericValue,
        },
      },
    }));
    return;
  }

  setFormData((prev) => ({
    ...prev,
    education: {
      ...prev.education,
      [level]: {
        ...prev.education[level],
        [field]: value,
      },
    },
  }));
  return;
}

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const projects = prev.projects.slice();
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "" }],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };
    // ---------------- EXPERIENCE ----------------
  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "", company: "", years: "", description: "" },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };
  const addSkill = () => {
    const skill = formData.skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
        skillInput: "",
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "* Required";
    if (!formData.email.trim()) tempErrors.email = "* Required";
    if (!validateMobile(formData.countryCode, formData.mobile)) {
    tempErrors.mobile = "* Invalid mobile number";
     }
    if (!formData.careerObjective.trim()) tempErrors.careerObjective = "* Required";

    if (formData.skills.length === 0) tempErrors.skills = "* Required";
    if (!formData.achievements.trim()) tempErrors.achievements = "* Required";
    if (!formData.certifications.trim())
      tempErrors.certifications = "* Required";

    ["tenth", "twelth", "ug"].forEach((level) => {
      const edu = formData.education[level];
      if (!edu.marks || !edu.college) tempErrors[level] = "* Required";
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateMobile = (countryCode, mobile) => {
  if (countryCode === "+91") {
    const indianMobileRegex = /^[6-9][0-9]{9}$/;
    return indianMobileRegex.test(mobile);
  } else {
    const genericMobileRegex = /^[0-9]{10}$/;
    return genericMobileRegex.test(mobile);
  }
};
// ---------------- ACHIEVEMENTS ----------------
const handleAchievementChange = (index, value) => {
  setFormData((prev) => {
    const achievements = [...prev.achievements];
    achievements[index] = value;
    return { ...prev, achievements };
  });
};

const addAchievement = () => {
  setFormData((prev) => ({
    ...prev,
    achievements: [...prev.achievements, ""],
  }));
};

const removeAchievement = (index) => {
  setFormData((prev) => ({
    ...prev,
    achievements: prev.achievements.filter((_, i) => i !== index),
  }));
};

// ---------------- CERTIFICATIONS ----------------
const handleCertificationChange = (index, value) => {
  setFormData((prev) => {
    const certifications = [...prev.certifications];
    certifications[index] = value;
    return { ...prev, certifications };
  });
};

const addCertification = () => {
  setFormData((prev) => ({
    ...prev,
    certifications: [...prev.certifications, ""],
  }));
};

const removeCertification = (index) => {
  setFormData((prev) => ({
    ...prev,
    certifications: prev.certifications.filter((_, i) => i !== index),
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // validating the form
  if (!validate()) {
    alert("Please fill all mandatory fields");
    return;
  }

  console.log("Form data sent to preview:", formData);
  const fullMobile = `${formData.countryCode}${formData.mobile}`;
  const finalData = {
    ...formData,
    fullMobile,
    tenthSchool: formData.education.tenth.school,
    tenthYear: formData.education.tenth.year,
    tenthMarks: formData.education.tenth.marks,
    twelthCollege: formData.education.twelth.college,
    twelthYear: formData.education.twelth.year,
    twelthMarks: formData.education.twelth.marks,
    ugCollege: formData.education.ug.college,
    ugYear: formData.education.ug.year,
    ugMarks: formData.education.ug.marks,
    pgCollege: formData.education.pg.college,
    pgYear: formData.education.pg.year,
    pgMarks: formData.education.pg.marks,
  };
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/resume",
      finalData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Resume saved in DB:", res.data);
    navigate("/templates-preview", { state: { resumeData: res.data.resume } });
    if (onSubmit) onSubmit(res.data.resume);
  } catch (err) {
    console.error("Error saving resume:", err.response?.data || err.message);
    alert("Failed to save resume. Please try again.");
  }
};
  const handleSave = (e) => {
    e.preventDefault();
    const newId = saveResume(resumeId, formData);
    alert(`Resume ${resumeId === 'new' ? 'saved' : 'updated'} successfully!`);
    if (resumeId === 'new') {
      navigate(`/editor/${newId}`, { replace: true });
    }
  };
  // ---------------- CUSTOM SECTIONS ----------------
const handleCustomSectionChange = (index, field, value) => {
  setFormData((prev) => {
    const customSections = [...(prev.customSections || [])];
    customSections[index] = { ...(customSections[index] || {}), [field]: value };
    return { ...prev, customSections };
  });
};

const addCustomSection = () => {
  setFormData((prev) => ({
    ...prev,
    customSections: [...(prev.customSections || []), { title: "", content: "" }],
  }));
};

const removeCustomSection = (index) => {
  setFormData((prev) => ({
    ...prev,
    customSections: (prev.customSections || []).filter((_, i) => i !== index),
  }));
};



  return (
    <div>
      <div className="form-panel-header"><h2>Resume Form</h2></div>
      <div className="form-scrollable-area">
        <div className="editable-title-wrapper">
          <div className="editable-title-container" title="Click to rename your resume">
            <input
              type="text"
              name="resumeTitle"
              className="editable-title-input"
              value={formData.resumeTitle || ''}
              onChange={handleChange}
              aria-label="Resume Title"
              size="1" 
            />
            <svg
              className="edit-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16" /* Smaller icon */
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </div>
        </div>
      <div className="form-page-container">
      <form onSubmit={handleSave}>
        {/* ---------------- BASIC INFO ---------------- */}
        <div>
          <h3 className="h3-heading">
            Full Name <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <div style={{ color: "red" }}>{errors.name}</div>
        </div>

        <div>
          <h3 className="h3-heading">
            Email <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="xyz@gmail.com"
          />
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>

        <div>
          <h3 className="h3-heading">
            Mobile <span style={{ color: "red" }}>*</span>
          </h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              style={{ width: "120px" }}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+49">+49 (Germany)</option>
              <option value="+33">+33 (France)</option>
              <option value="+86">+86 (China)</option>
              <option value="+55">+55 (Brazil)</option>
              <option value="+7">+7 (Russia)</option>
            </select>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              maxLength={10}
              onChange={handleChange}
              placeholder="1234567890"
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ color: "red" }}>{errors.mobile}</div>
        </div>

        {/* ---------------- LINKS ---------------- */}
        <div>
          <h3 className="h3-heading">LinkedIn (Optional)</h3>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/username"
          />
        </div>

        <div>
          <h3 className="h3-heading">GitLab (Optional)</h3>
          <input
            type="url"
            name="gitlab"
            value={formData.gitlab}
            onChange={handleChange}
            placeholder="https://gitlab.com/username"
          />
        </div>
         {/* ---------------- CAREER OBJECTIVE ---------------- */}
<div>
  <h3 className="h3-heading">
    Career Objective <span style={{ color: "red" }}>*</span>
  </h3>
  <textarea
    name="careerObjective"
    value={formData.careerObjective}
    onChange={handleChange}
    rows={4}
    style={{ width: "100%" }}
  />
  <div style={{ color: "red" }}>{errors.careerObjective}</div>
</div>
<h3 className="h3-heading">Education <span style={{ color: "red" }}>*</span></h3>
<div className="education">
  {["tenth", "twelth", "ug", "pg"].map((level) => (
    <div key={level}>
      <label style={{ fontWeight: "bold" }} className="degree-label">
        {level.toUpperCase()}
        {level !== "pg" ? <span style={{ color: "red" }}>*</span> : " (Optional)"}
      </label>
      
      <label>Marks/CGPA:</label>
      <input
        type="text"
        name={`education.${level}.marks`}
        value={formData.education?.[level]?.marks || ''} 
        onChange={handleChange}
      />
      
      <label>{level === "tenth" ? "School:" : "College:"}</label>
      <input
        type="text"
        name={`education.${level}.${level === "tenth" ? "school" : "college"}`}
        value={formData.education?.[level]?.[level === "tenth" ? "school" : "college"] || ''}
        onChange={handleChange}
      />
      
      <div style={{ color: "red" }}>{errors[level]}</div>
      
      <label>Year of Passing:</label>
      <select
        name={`education.${level}.year`}
        value={formData.education?.[level]?.year || ''}
        onChange={handleChange}
      >
        <option value="">Select Year</option> 
        {years.map((yr) => (
          <option key={yr} value={yr}>{yr}</option>
        ))}
      </select>
    </div>
  ))}
</div>
        {/* ---------------- SKILLS ---------------- */}
        <div>
          <h3 className="h3-heading">
            Skills <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="text"
            name="skillInput"
            value={formData.skillInput}
            onChange={handleChange}
            placeholder="Enter a skill"
          />
          <button type="button-add" onClick={addSkill}>
            Add
          </button>
          <div className="skills-list">
  {formData.skills.map((skill, idx) => (
    <div className="skill-box" key={idx}>
      {skill}
      <button
        type="button"
        className="remove-btn"
        onClick={() => removeSkill(skill)}
      >
        ✖
      </button>
    </div>
  ))}
</div>

          <div style={{ color: "red" }}>{errors.skills}</div>
        </div>
<div>
  <h3>Experience</h3>
  {(formData.experience || []).map((exp, idx) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <label>Job Role</label>
      <input
        type="text"
        value={exp?.role || ''} 
        onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
      />
      
      <label>Company/Organization</label>
      <input
        type="text"
        value={exp?.company || ''}
        onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
      />
      
      <label>Years of Experience</label>
      <input
        type="text"
        value={exp?.years || ''}
        onChange={(e) => handleExperienceChange(idx, "years", e.target.value)}
      />
      
      <label>Job Description</label>
      <textarea
        value={exp?.description || ''}
        onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
      />
      
      <button type="button" onClick={() => removeExperience(idx)}>
        Remove
      </button>
    </div>
  ))}
  <button type="button" onClick={addExperience}>
    Add Experience
  </button>
</div>

<div>
  <h3 className="h3-heading">Projects (Optional)</h3>

  {(formData.projects || []).map((proj, idx) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <label>Project Title</label>
      <input
        type="text"
        value={proj?.title || ''}
        onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
      />
      <label>Project Description</label>
      <textarea
        value={proj?.description || ''}
        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
      />
      <button type="button" onClick={() => removeProject(idx)}>
        Remove
      </button>
    </div>
  ))}
  <button type="button" onClick={addProject}>
    Add Project
  </button>
</div>

        {/* ---------------- ACHIEVEMENTS ---------------- */}
        <div>
  <h3 className="h3-heading">
    Achievements <span style={{ color: "red" }}>*</span>
  </h3>

  {(formData.achievements || []).map((ach, idx) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <textarea
        value={ach}
        onChange={(e) => handleAchievementChange(idx, e.target.value)}
        placeholder="Enter an achievement"
      />
      <button type="button" onClick={() => removeAchievement(idx)}>
        Remove
      </button>
    </div>
  ))}
  <button type="button" onClick={addAchievement}>
    + Add Achievement
  </button>

  <div style={{ color: "red" }}>{errors.achievements}</div>
</div>

           

        {/* ---------------- CERTIFICATIONS ---------------- */}
        <div>
  <h3 className="h3-heading">
    Certifications <span style={{ color: "red" }}>*</span>
  </h3>

  {(formData.certifications || []).map((cert, idx) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <textarea
        value={cert}
        onChange={(e) => handleCertificationChange(idx, e.target.value)}
        placeholder="Enter a certification"
      />
      <button type="button" onClick={() => removeCertification(idx)}>
        Remove
      </button>
    </div>
  ))}
  <button type="button" onClick={addCertification}>
    + Add Certification
  </button>

  <div style={{ color: "red" }}>{errors.certifications}</div>
</div>

        {/* ---------------- ADDITIONAL / CUSTOM SECTIONS ---------------- */}
<div>
  <h3 className="h3-heading">Additional Sections (Optional)</h3>
  {(formData.customSections || []).map((section, idx) => (
    <div key={idx} style={{ marginBottom: "15px" }}>
      <label>Section Title</label>
      <input
        type="text"
        value={section.title}
        onChange={(e) =>
          handleCustomSectionChange(idx, "title", e.target.value)
        }
        placeholder="e.g., Volunteer Work, Publications"
      />

      <label>Content</label>
      <textarea
        value={section.content}
        onChange={(e) =>
          handleCustomSectionChange(idx, "content", e.target.value)
        }
        placeholder="Enter details here..."
      />

      <button type="button" onClick={() => removeCustomSection(idx)}>
        Remove Section
      </button>
    </div>
  ))}

  <button type="button" onClick={addCustomSection}>
    + Add Section
  </button>
</div>

           

        <button type="submit" className="submit-resume-btn">Submit Resume</button>
        
      </form>
      </div>
    </div>
    </div>
  );
}
  
export default ResumeForm;