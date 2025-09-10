import React from "react";
import "./ResumeTemplate3.css";

function ResumeTemplate3({ data }) {
  return (
    <div className="resume-list">
      {data.name && <h1>{data.name}</h1>}
      {data.email && <p><b>Email:</b> {data.email}</p>}
      {data.mobile && <p><b>Phone:</b> {data.mobile}</p>}

      {data.skills && data.skills.length > 0 && (
        <>
          <h2>Skills</h2>
          <ul>
            {data.skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </>
      )}

      {data.experience && (
        <>
          <h2>Experience</h2>
          <p>{data.experience}</p>
        </>
      )}

      {data.projects && data.projects.length > 0 && (
        <>
          <h2>Projects</h2>
          <ul>
            {data.projects.map((proj, i) => (
              (proj.title || proj.description) && (
                <li key={i}><b>{proj.title}</b>: {proj.description}</li>
              )
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ResumeTemplate3;
