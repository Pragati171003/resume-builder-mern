import React, { useState } from "react";
import "./ResumeForm.css";
const years = Array.from({ length: 28 }, (_, i) => 2000 + i); // 2000-2027

function ResumeForm() {
  const [formData, setFormData] = useState({
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
    projects: "",
    achievements: "",
    certifications: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData((prev) => ({ ...prev, email: value.toLowerCase() }));
      return;
    }

    if (name === "mobile") {
      const digits = value.replace(/\D/g, "");
      if (digits !== value) {
        setErrors((prev) => ({ ...prev, mobile: "Enter only digits" }));
      } else {
        setErrors((prev) => ({ ...prev, mobile: "" }));
      }
      setFormData((prev) => ({ ...prev, mobile: digits }));
      return;
    }

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          [section]: { ...prev.education[section], [field]: value },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    if (!formData.mobile || formData.mobile.length !== 10)
      tempErrors.mobile = "* Required (10 digits)";
    if (formData.skills.length === 0) tempErrors.skills = "* Required";
    if (!formData.achievements.trim()) tempErrors.achievements = "* Required";
    if (!formData.certifications.trim()) tempErrors.certifications = "* Required";

    ["tenth", "twelth", "ug"].forEach((level) => {
      const edu = formData.education[level];
      if (!edu.marks || !edu.college) tempErrors[level] = "* Required";
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const fullMobile = formData.countryCode + formData.mobile;
      console.log("Resume Submitted:", { ...formData, fullMobile });
      alert("Resume Submitted! Check console for details.");
    } else {
      alert("Please fill all mandatory fields");
    }
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid black" }}>
      <h2>Resume Form</h2>
      <form onSubmit={handleSubmit}>

        
        <div>
          <label>
            Full Name <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <textarea
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <div style={{ color: "red" }}>{errors.name}</div>
        </div>
        <br />

        
        <div>
          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="xyz@gmail.com"
          />
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>
        <br />

        
        <div>
          <label>
            Mobile <span style={{ color: "red" }}>*</span> (10 digits)
          </label>
          <br />
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
        <br />

        
        <div>
          <label>LinkedIn (Optional)</label><br />
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/username"
          />
        </div>
        <br />

        
        <div>
          <label>GitLab (Optional)</label><br />
          <input
            type="url"
            name="gitlab"
            value={formData.gitlab}
            onChange={handleChange}
            placeholder="https://gitlab.com/username"
          />
        </div>
        <br />

       
        <h3>Education</h3>
        {["tenth", "twelth", "ug", "pg"].map((level) => (
          <div key={level} style={{ marginBottom: "15px" }}>
            <strong>
              {level.toUpperCase()}
              {level !== "pg" ? <span style={{ color: "red" }}>*</span> : " (Optional)"}
            </strong>
            <br />
            
            Marks/CGPA:{" "}
            <input
              type="text"
              name={`education.${level}.marks`}
              value={formData.education[level].marks}
              onChange={handleChange}
              placeholder="e.g., 85 or 8.5"
            />
            <br />
            College:{" "}
            <input
              type="text"
              name={`education.${level}.college`}
              value={formData.education[level].college}
              onChange={handleChange}
              placeholder="College Name"
            />
            <div style={{ color: "red" }}>{errors[level]}</div>
            <br />
            Year of Passing:{" "}
            <select
              name={`education.${level}.year`}
              value={formData.education[level].year}
              onChange={handleChange}
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
            <br /><br />
          </div>
        ))}

        
        <div>
          <label>
            Skills <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <div>
            <input
              type="text"
              name="skillInput"
              value={formData.skillInput}
              onChange={handleChange}
              placeholder="Enter a skill"
            />
            <button type="button" onClick={addSkill}>Add</button>
          </div>
          <div>
            {formData.skills.map((skill, idx) => (
              <span key={idx} style={{ marginRight: "10px" }}>
                {skill} <button type="button" onClick={() => removeSkill(skill)}>x</button>
              </span>
            ))}
          </div>
          <div style={{ color: "red" }}>{errors.skills}</div>
        </div>
        <br />

       
        <div>
          <label>Experience (Optional)</label><br />
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Write here..."
          />
        </div>
        <br />

        
        <div>
          <label>Projects (Optional)</label><br />
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="Write here..."
          />
        </div>
        <br />

        
        <div>
          <label>
            Achievements <span style={{ color: "red" }}>*</span>
          </label><br />
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="Write here..."
          />
          <div style={{ color: "red" }}>{errors.achievements}</div>
        </div>
        <br />

        
        <div>
          <label>
            Certifications <span style={{ color: "red" }}>*</span>
          </label><br />
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="Write here..."
          />
          <div style={{ color: "red" }}>{errors.certifications}</div>
        </div>
        <br />

        <button type="submit">Submit Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;
