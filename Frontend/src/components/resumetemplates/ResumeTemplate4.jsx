import React from "react";
import "./ResumeTemplate4.css";

function ResumeTemplate4({ data }) {
  return (
    <div className="resume-4">
      {/* Header */}
      {(data.name || data.email || data.mobile || data.linkedin || data.gitlab) && (
        <header>
          {data.name && <h1>{data.name}</h1>}
          <div className="contact">
            {data.email && <span>Email: {data.email}</span>}
            {data.mobile && <span> | Phone: {data.mobile}</span>}
            {data.linkedin && <span> | LinkedIn: {data.linkedin}</span>}
            {data.gitlab && <span> | GitHub: {data.gitlab}</span>}
          </div>
        </header>
      )}

      <div className="columns">
        {/* Left Column */}
        <div className="left-column">
          {/* Education */}
          {(data.tenthCollege || data.twelthCollege || data.ugCollege || data.pgCollege) && (
            <section>
              <h2>Education</h2>
              {data.tenthCollege && <p><b>SSC (10th)</b> - {data.tenthCollege} {data.tenthYear && `(Year: ${data.tenthYear})`} {data.tenthMarks && `(Marks: ${data.tenthMarks})`}</p>}
              {data.twelthCollege && <p><b>Intermediate (12th)</b> - {data.twelthCollege} {data.twelthYear && `(Year: ${data.twelthYear})`} {data.twelthMarks && `(Marks: ${data.twelthMarks})`}</p>}
              {data.ugCollege && <p><b>UG</b> - {data.ugCollege} {data.ugYear && `(Year: ${data.ugYear})`} {data.ugMarks && `(Marks: ${data.ugMarks})`}</p>}
              {data.pgCollege && <p><b>PG</b> - {data.pgCollege} {data.pgYear && `(Year: ${data.pgYear})`} {data.pgMarks && `(Marks: ${data.pgMarks})`}</p>}
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <ul>
                {data.skills.map((skill, index) => <li key={index}>{skill}</li>)}
              </ul>
            </section>
          )}

          {/* Experience */}
          {data.experience && (
            <section>
              <h2>Experience</h2>
              <p>{data.experience}</p>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Projects */}
          {data.projects && data.projects.some(p => p.title || p.description) && (
            <section>
              <h2>Projects</h2>
              {data.projects.map((proj, idx) => (
                (proj.title || proj.description) && (
                  <div key={idx}>
                    {proj.title && <p><b>{proj.title}</b></p>}
                    {proj.description && <p>{proj.description}</p>}
                  </div>
                )
              ))}
            </section>
          )}

          {/* Achievements */}
          {data.achievements && (
            <section>
              <h2>Achievements</h2>
              <p>{data.achievements}</p>
            </section>
          )}

          {/* Certifications */}
          {data.certifications && (
            <section>
              <h2>Certifications</h2>
              <p>{data.certifications}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate4;
