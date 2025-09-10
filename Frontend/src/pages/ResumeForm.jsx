// import React, { useState } from "react";
// import "./ResumeForm.css";
// import { useNavigate } from 'react-router-dom';
// const years = Array.from({ length: 28 }, (_, i) => 2000 + i); // 2000-2027

// function ResumeForm({onSubmit}) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     countryCode: "+91", // ✅ Default India
//     linkedin: "",
//     gitlab: "",
//     education: {
//       tenth: { marks: "", marksType: "Marks", college: "", year: 2025 },
//       twelth: { marks: "", marksType: "Marks", college: "", year: 2025 },
//       ug: { marks: "", marksType: "Marks", college: "", year: 2025 },
//       pg: { marks: "", marksType: "Marks", college: "", year: 2025 },
//     },
//     skills: [],
//     skillInput: "",
//     experience: "",
//     projects: [{ title: "", description: "" }],
//     achievements: "",
//     certifications: "",
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setFormData((prev) => ({ ...prev, email: value.toLowerCase() }));
//       return;
//     }

//     if (name === "mobile") {
//       const digits = value.replace(/\D/g, "");
//       if (digits !== value) {
//         setErrors((prev) => ({ ...prev, mobile: "Enter only digits" }));
//       } else {
//         setErrors((prev) => ({ ...prev, mobile: "" }));
//       }
//       setFormData((prev) => ({ ...prev, mobile: digits }));
//       return;
//     }

//     // ✅ Fix: handle countryCode
//     if (name === "countryCode") {
//       setFormData((prev) => ({ ...prev, countryCode: value }));
//       return;
//     }

//     if (name.startsWith("education.")) {
//   const [, level, field] = name.split(".");
//   setFormData((prev) => ({
//     ...prev,
//     education: {
//       ...prev.education,
//       [level]: {
//         ...prev.education[level],
//         [field]: value,
//       },
//     },
//   }));
//   return;
// }
//   setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProjectChange = (index, field, value) => {
//     setFormData((prev) => {
//       const projects = prev.projects.slice();
//       projects[index] = { ...projects[index], [field]: value };
//       return { ...prev, projects };
//     });
//   };

//   const addProject = () => {
//     setFormData((prev) => ({
//       ...prev,
//       projects: [...prev.projects, { title: "", description: "" }],
//     }));
//   };

//   const removeProject = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       projects: prev.projects.filter((_, i) => i !== index),
//     }));
//   };

//   const addSkill = () => {
//     const skill = formData.skillInput.trim();
//     if (skill && !formData.skills.includes(skill)) {
//       setFormData((prev) => ({
//         ...prev,
//         skills: [...prev.skills, skill],
//         skillInput: "",
//       }));
//     }
//   };

//   const removeSkill = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((s) => s !== skill),
//     }));
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.name.trim()) tempErrors.name = "* Required";
//     if (!formData.email.trim()) tempErrors.email = "* Required";
//     if (!formData.mobile || formData.mobile.length !== 10)
//       tempErrors.mobile = "* Required (10 digits)";
//     if (formData.skills.length === 0) tempErrors.skills = "* Required";
//     if (!formData.achievements.trim()) tempErrors.achievements = "* Required";
//     if (!formData.certifications.trim()) tempErrors.certifications = "* Required";

//     ["tenth", "twelth", "ug"].forEach((level) => {
//       const edu = formData.education[level];
//       if (!edu.marks || !edu.college) tempErrors[level] = "* Required";
//     });

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//    const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const fullMobile = formData.countryCode + formData.mobile;
//       const finalData = { ...formData, fullMobile };
      
//       console.log("Resume Submitted:", finalData);
//       navigate('/templates-preview', { state: { resumeData: finalData } });

//       // ✅ send data back to App.jsx
//       if (onSubmit) {
//         onSubmit(finalData);
//       }
//     } else {
//       alert("Please fill all mandatory fields");
//     }
//   };

//   return (
//     <div>
//       <h2>Resume Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h3>
//             Full Name <span style={{ color: "red" }}>*</span>
//           </h3>
//           <br />
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="John Doe"
//           />
//           <div style={{ color: "red" }}>{errors.name}</div>
//         </div>
//         <br />

//         <div>
//           <h3>
//             Email <span style={{ color: "red" }}>*</span>
//           </h3>
//           <br />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="xyz@gmail.com"
//           />
//           <div style={{ color: "red" }}>{errors.email}</div>
//         </div>
//         <br />

//         <div>
//           <h3>
//             Mobile <span style={{ color: "red" }}>*</span> (10 digits)
//           </h3>
//           <br />
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <select
//               name="countryCode"
//               value={formData.countryCode}
//               onChange={handleChange}
//               style={{ width: "120px" }}
//             >
//               <option value="+91">+91 (India)</option>
//               <option value="+1">+1 (USA)</option>
//               <option value="+44">+44 (UK)</option>
//               <option value="+61">+61 (Australia)</option>
//               <option value="+81">+81 (Japan)</option>
//               <option value="+49">+49 (Germany)</option>
//               <option value="+33">+33 (France)</option>
//               <option value="+86">+86 (China)</option>
//               <option value="+55">+55 (Brazil)</option>
//               <option value="+7">+7 (Russia)</option>
//             </select>

//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               maxLength={10}
//               onChange={handleChange}
//               placeholder="1234567890"
//               style={{ flex: 1 }}
//             />
//           </div>
//           <div style={{ color: "red" }}>{errors.mobile}</div>
//         </div>
//         <br />

//         <div>
//           <h3>LinkedIn (Optional)</h3>
//           <br />
//           <input
//             type="url"
//             name="linkedin"
//             value={formData.linkedin}
//             onChange={handleChange}
//             placeholder="https://www.linkedin.com/in/username"
//           />
//         </div>
//         <br />

//         <div>
//           <h3>GitLab (Optional)</h3>
//           <br />
//           <input
//             type="url"
//             name="gitlab"
//             value={formData.gitlab}
//             onChange={handleChange}
//             placeholder="https://gitlab.com/username"
//           />
//         </div>
//         <br />

//         <h3>Education</h3>
//         <div className="education">
//           {["tenth", "twelth", "ug", "pg"].map((level) => (
//             <div key={level} style={{ marginBottom: "15px" }}>
//               <label style={{ fontWeight: "bold" }} className="degree-label">
//                 {level.toUpperCase()}
//                 {level !== "pg" ? (
//                   <span style={{ color: "red" }}>*</span>
//                 ) : (
//                   " (Optional)"
//                 )}
//               </label>

//               <label>Marks/CGPA:</label>
//               <input
//                 type="text"
//                 name={`education.${level}.marks`}
//                 value={formData.education[level].marks}
//                 onChange={handleChange}
//                 placeholder="e.g., 85 or 8.5"
//               />

//               <label>College:</label>
//               <input
//                 type="text"
//                 name={`education.${level}.college`}
//                 value={formData.education[level].college}
//                 onChange={handleChange}
//                 placeholder="College Name"
//               />
//               <div style={{ color: "red" }}>{errors[level]}</div>

//               <label>Year of Passing:</label>
//               <select
//                 name={`education.${level}.year`}
//                 value={formData.education[level].year}
//                 onChange={handleChange}
//               >
//                 {years.map((yr) => (
//                   <option key={yr} value={yr}>
//                     {yr}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ))}
//         </div>

//         <div>
//           <h3>
//             Skills <span style={{ color: "red" }}>*</span>
//           </h3>
//           <br />
//           <div>
//             <input
//               type="text"
//               name="skillInput"
//               value={formData.skillInput}
//               onChange={handleChange}
//               placeholder="Enter a skill"
//             />
//             <button type="button" onClick={addSkill}>
//               Add
//             </button>
//           </div>
//           <div>
//             {formData.skills.map((skill, idx) => (
//               <span key={idx} style={{ marginRight: "10px" }}>
//                 {skill}{" "}
//                 <button type="button" onClick={() => removeSkill(skill)}>
//                   x
//                 </button>
//               </span>
//             ))}
//           </div>
//           <div style={{ color: "red" }}>{errors.skills}</div>
//         </div>
//         <br />

//         <div>
//           <h3>Experience (Optional)</h3>
//           <br />
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Write here..."
//           />
//         </div>
//         <br />

//         <div>
//           <h3>Projects (Optional)</h3>
//           <br />
//           {formData.projects.map((proj, idx) => (
//             <div
//               key={idx}
//               style={{
//                 border: "1px solid #e6eef3",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 marginBottom: "10px",
//                 background: "#fafcff",
//               }}
//             >
//               <label>Project Title</label>
//               <input
//                 type="text"
//                 value={proj.title}
//                 onChange={(e) =>
//                   handleProjectChange(idx, "title", e.target.value)
//                 }
//                 placeholder="Project title"
//               />

//               <label>Project Description</label>
//               <textarea
//                 value={proj.description}
//                 onChange={(e) =>
//                   handleProjectChange(idx, "description", e.target.value)
//                 }
//                 placeholder="Describe the project..."
//               />

//               <div
//                 style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
//               >
//                 <button type="button" onClick={() => removeProject(idx)}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <button type="button" onClick={addProject}>
//             Add Project
//           </button>
//         </div>
//         <br />

//         <div>
//           <h3>
//             Achievements <span style={{ color: "red" }}>*</span>
//           </h3>
//           <br />
//           <textarea
//             name="achievements"
//             value={formData.achievements}
//             onChange={handleChange}
//             placeholder="Write here..."
//           />
//           <div style={{ color: "red" }}>{errors.achievements}</div>
//         </div>
//         <br />

//         <div>
//           <h3>
//             Certifications <span style={{ color: "red" }}>*</span>
//           </h3>
//           <br />
//           <textarea
//             name="certifications"
//             value={formData.certifications}
//             onChange={handleChange}
//             placeholder="Write here..."
//           />
//           <div style={{ color: "red" }}>{errors.certifications}</div>
//         </div>
//         <br />

//         <button type="submit">Submit Resume</button>
//       </form>
//       <div>
      
//       <form onSubmit={handleSubmit}>
//         {/* ... all your input fields ... */}
//         <button type="submit">Preview Resume</button> {/* Changed button text */}
//       </form>
//     </div>
//     </div>
//   );
// }

// export default ResumeForm;
import React, { useState } from "react";
import "./ResumeForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const years = Array.from({ length: 28 }, (_, i) => 2000 + i); // 2000-2027

function ResumeForm({ onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91", // ✅ Default India
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

    if (name === "countryCode") {
      setFormData((prev) => ({ ...prev, countryCode: value }));
      return;
    }

    if (name.startsWith("education.")) {
      const [, level, field] = name.split(".");
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
    if (!formData.certifications.trim())
      tempErrors.certifications = "* Required";

    ["tenth", "twelth", "ug"].forEach((level) => {
      const edu = formData.education[level];
      if (!edu.marks || !edu.college) tempErrors[level] = "* Required";
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const fullMobile = formData.countryCode + formData.mobile;
      const finalData = { ...formData, fullMobile };

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

        // ✅ Redirect to preview page with saved resume
        navigate("/templates-preview", { state: { resumeData: res.data.resume } });

        if (onSubmit) onSubmit(res.data.resume);
      } catch (err) {
        console.error("Error saving resume:", err.response?.data || err.message);
        alert("Failed to save resume. Please try again.");
      const finalData = {
      ...formData,
      fullMobile,
      tenthCollege: formData.education.tenth.college,
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
    }
      
      console.log("Resume Submitted:", finalData);

      // ✅ send data back to App.jsx
      if (onSubmit) {
        onSubmit(finalData);
      }
     else {
      alert("Please fill all mandatory fields");
    }
  };

  return (
    <div>
      <h1>Resume Form</h1>
      <form onSubmit={handleSubmit}>
        {/* ---------------- BASIC INFO ---------------- */}
        <div>
          <h3>
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
          <h3>
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
          <h3>
            Mobile <span style={{ color: "red" }}>*</span> (10 digits)
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
          <h3>LinkedIn (Optional)</h3>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/username"
          />
        </div>

        <div>
          <h3>GitLab (Optional)</h3>
          <input
            type="url"
            name="gitlab"
            value={formData.gitlab}
            onChange={handleChange}
            placeholder="https://gitlab.com/username"
          />
        </div>

        {/* ---------------- EDUCATION ---------------- */}
        <h3>Education</h3>
        <div className="education">
          {["tenth", "twelth", "ug", "pg"].map((level) => (
            <div key={level}>
              <label style={{ fontWeight: "bold" }} className="degree-label">
                {level.toUpperCase()}
                {level !== "pg" ? (
                  <span style={{ color: "red" }}>*</span>
                ) : (
                  " (Optional)"
                )}
              </label>
              <label>Marks/CGPA:</label>
              <input
                type="text"
                name={`education.${level}.marks`}
                value={formData.education[level].marks}
                onChange={handleChange}
              />
              <label>College:</label>
              <input
                type="text"
                name={`education.${level}.college`}
                value={formData.education[level].college}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>{errors[level]}</div>
              <label>Year of Passing:</label>
              <select
                name={`education.${level}.year`}
                value={formData.education[level].year}
                onChange={handleChange}
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* ---------------- SKILLS ---------------- */}
        <div>
          <h3>
            Skills <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="text"
            name="skillInput"
            value={formData.skillInput}
            onChange={handleChange}
            placeholder="Enter a skill"
          />
          <button type="button" onClick={addSkill}>
            Add
          </button>
          <div>
            {formData.skills.map((skill, idx) => (
              <span key={idx} style={{ marginRight: "10px" }}>
                {skill}{" "}
                <button type="button" onClick={() => removeSkill(skill)}>
                  x
                </button>
              </span>
            ))}
          </div>
          <div style={{ color: "red" }}>{errors.skills}</div>
        </div>

        {/* ---------------- EXPERIENCE ---------------- */}
        <div>
          <h3>Experience (Optional)</h3>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        {/* ---------------- PROJECTS ---------------- */}
        <div>
          <h3>Projects (Optional)</h3>
          {formData.projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <label>Project Title</label>
              <input
                type="text"
                value={proj.title}
                onChange={(e) =>
                  handleProjectChange(idx, "title", e.target.value)
                }
              />
              <label>Project Description</label>
              <textarea
                value={proj.description}
                onChange={(e) =>
                  handleProjectChange(idx, "description", e.target.value)
                }
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
          <h3>
            Achievements <span style={{ color: "red" }}>*</span>
          </h3>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.achievements}</div>
        </div>

        {/* ---------------- CERTIFICATIONS ---------------- */}
        <div>
          <h3>
            Certifications <span style={{ color: "red" }}>*</span>
          </h3>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.certifications}</div>
        </div>

        <button type="submit">Submit Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;

