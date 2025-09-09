import React from "react";

function ResumeTemplate2({ data }) {
  if (!data) return null;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Header (Mandatory) */}
      <h1 style={{ color: "#2E86C1", marginBottom: "5px" }}>{data.name}</h1>
      <p>
        {data.email} | {data.countryCode} {data.mobile}
      </p>

      {/* Optional Links */}
      {data.linkedin && <p>🔗 LinkedIn: {data.linkedin}</p>}
      {data.gitlab && <p>💻 GitLab: {data.gitlab}</p>}

      <hr />

      {/* Education (Tenth, Twelth, UG always shown) */}
      <h2>🎓 Education</h2>
      {["tenth", "twelth", "ug"].map((level) => {
        const edu = data.education[level];
        if (!edu) return null;
        return (
          <div key={level}>
            <strong>{level.toUpperCase()}</strong> - {edu.college}, {edu.year}
            <br />
            Marks/CGPA: {edu.marks}
          </div>
        );
      })}

      {/* PG is Optional */}
      {data.education.pg &&
        (data.education.pg.college || data.education.pg.marks) && (
          <div>
            <strong>PG</strong> - {data.education.pg.college},{" "}
            {data.education.pg.year}
            <br />
            Marks/CGPA: {data.education.pg.marks}
          </div>
        )}

      <hr />

      {/* Optional Sections */}
      {data.skills && data.skills.length > 0 && (
        <>
          <h2>🛠 Skills</h2>
          <p>{data.skills.join(", ")}</p>
          <hr />
        </>
      )}

      {data.experience && data.experience.trim() !== "" && (
        <>
          <h2>💼 Experience</h2>
          <p>{data.experience}</p>
          <hr />
        </>
      )}

      {data.projects &&
        data.projects.some((p) => p.title || p.description) && (
          <>
            <h2>📂 Projects</h2>
            {data.projects.map((proj, idx) => {
              if (!proj.title && !proj.description) return null;
              return (
                <div key={idx}>
                  <strong>{proj.title}</strong>
                  <p>{proj.description}</p>
                </div>
              );
            })}
            <hr />
          </>
        )}

      {data.achievements && data.achievements.trim() !== "" && (
        <>
          <h2>🏆 Achievements</h2>
          <p>{data.achievements}</p>
          <hr />
        </>
      )}

      {data.certifications && data.certifications.trim() !== "" && (
        <>
          <h2>📜 Certifications</h2>
          <p>{data.certifications}</p>
        </>
      )}
    </div>
  );
}

export default ResumeTemplate2;
