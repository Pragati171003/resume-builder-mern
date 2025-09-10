import React from "react";
import "./ResumeTemplate1.css";

function ResumeTemplate1({ data }) {
  return (
    <div className="resume-2col">
      {/* Left Column */}
      <div className="left-col">
        {data.name && <h1>{data.name}</h1>}
        <div className="contact">
          {data.email && <p>{data.email}</p>}
          {data.mobile && <p>{data.mobile}</p>}
          {data.linkedin && <p>{data.linkedin}</p>}
          {data.gitlab && <p>{data.gitlab}</p>}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="skills">
            <h2>Skills</h2>
            <ul>
              {data.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="right-col">
        {(data.tenthCollege || data.twelthCollege || data.ugCollege) && (
          <div className="education">
            <h2>Education</h2>
            {data.tenthCollege && <p><b>SSC:</b> {data.tenthCollege}</p>}
            {data.twelthCollege && <p><b>Intermediate:</b> {data.twelthCollege}</p>}
            {data.ugCollege && <p><b>UG:</b> {data.ugCollege}</p>}
            {data.pgCollege && <p><b>PG:</b> {data.pgCollege}</p>}
          </div>
        )}

        {data.experience && (
          <div className="experience">
            <h2>Experience</h2>
            <p>{data.experience}</p>
          </div>
        )}

        {data.projects && data.projects.length > 0 && data.projects.some(p => p.title || p.description) && (
          <div className="projects">
            <h2>Projects</h2>
            {data.projects.map((proj, i) =>
              (proj.title || proj.description) && (
                <div key={i}>
                  {proj.title && <p><b>{proj.title}</b></p>}
                  {proj.description && <p>{proj.description}</p>}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeTemplate1;
