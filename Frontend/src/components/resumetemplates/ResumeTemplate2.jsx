import React from "react";
import "./ResumeTemplate2.css"; // optional: move the <style> here

function ResumeTemplate2({ data }) {
  return (
    <div className="resume-container">
      {/* Header */}
      {(data.name || data.email || data.mobile || data.linkedin || data.gitlab) && (
        <div className="header">
          {data.name && <h1>{data.name}</h1>}
          <div className="contact">
            {data.email && <p>Email: {data.email}</p>}
            {data.mobile && <p>Phone: {data.mobile}</p>}
            {data.linkedin && <p>LinkedIn: {data.linkedin}</p>}
            {data.gitlab && <p>GitHub: {data.gitlab}</p>}
          </div>
        </div>
      )}

      {/* Education */}
      {(data.tenthCollege || data.twelthCollege || data.ugCollege || data.pgCollege) && (
        <section>
          <h2 className="section-title">Education</h2>
          {data.tenthCollege && (
            <p>
              <b>SSC (10th)</b> - {data.tenthCollege}{" "}
              {data.tenthYear && `(Year: ${data.tenthYear})`}{" "}
              {data.tenthMarks && `(Marks: ${data.tenthMarks})`}
            </p>
          )}
          {data.twelthCollege && (
            <p>
              <b>Intermediate (12th)</b> - {data.twelthCollege}{" "}
              {data.twelthYear && `(Year: ${data.twelthYear})`}{" "}
              {data.twelthMarks && `(Marks: ${data.twelthMarks})`}
            </p>
          )}
          {data.ugCollege && (
            <p>
              <b>UG</b> - {data.ugCollege}{" "}
              {data.ugYear && `(Year: ${data.ugYear})`}{" "}
              {data.ugMarks && `(Marks: ${data.ugMarks})`}
            </p>
          )}
{data.pgCollege && (
  <p>
    <b>PG</b> - {data.pgCollege} (Year: {data.pgYear}, Marks: {data.pgMarks})
  </p>
)}
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2 className="section-title">Skills</h2>
          <div className="skills">
            {data.skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && (
        <section>
          <h2 className="section-title">Experience</h2>
          <p>{data.experience}</p>
        </section>
      )}

      {/* Projects */}
{data.projects && data.projects.length > 0 && data.projects.some(p => p.title || p.description) && (
  <section>
    <h2 className="section-title">Projects</h2>
    <div>
      {data.projects.map((proj, index) => (
        (proj.title || proj.description) && (
          <div key={index}>
            {proj.title && <p><b>{proj.title}</b></p>}
            {proj.description && <p>{proj.description}</p>}
          </div>
        )
      ))}
    </div>
  </section>
)}

      {/* Achievements */}
      {data.achievements && (
        <section>
          <h2 className="section-title">Achievements</h2>
          <p>{data.achievements}</p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && (
        <section>
          <h2 className="section-title">Certifications</h2>
          <p>{data.certifications}</p>
        </section>
      )}
    </div>
  );
}

export default ResumeTemplate2;