import React from "react";
import "./ResumeTemplate5.css";

function ResumeTemplate5({ data }) {
  return (
    <div className="resume-5">
      <header>
        {data.name && <h1>{data.name}</h1>}
        <p>
          {data.email && <span>{data.email}</span>}{" "}
          {data.mobile && <span>| {data.mobile}</span>}{" "}
          {data.linkedin && <span>| {data.linkedin}</span>}
        </p>
      </header>

      <div className="cards">
        {data.skills?.length > 0 && (
          <div className="card">
            <h2>Skills</h2>
            <ul>
              {data.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {(data.tenthCollege || data.ugCollege) && (
          <div className="card">
            <h2>Education</h2>
            {data.tenthCollege && <p><b>SSC:</b> {data.tenthCollege}</p>}
            {data.twelthCollege && <p><b>Intermediate:</b> {data.twelthCollege}</p>}
            {data.ugCollege && <p><b>UG:</b> {data.ugCollege}</p>}
            {data.pgCollege && <p><b>PG:</b> {data.pgCollege}</p>}
          </div>
        )}

        {data.projects?.some(p => p.title || p.description) && (
          <div className="card">
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

export default ResumeTemplate5;
