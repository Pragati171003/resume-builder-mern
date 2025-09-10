import React from "react";
import "./ResumeTemplate6.css";

function ResumeTemplate6({ data }) {
  return (
    <div className="resume-6">
      <header>
        {data.name && <h1>{data.name}</h1>}
        <p>
          {data.email && <span>{data.email}</span>}{" "}
          {data.mobile && <span>| {data.mobile}</span>}
        </p>
      </header>

      <div className="columns">
        {/* Left Column */}
        <div className="left">
          {data.skills?.length > 0 && (
            <section>
              <h2>Skills</h2>
              <ul>
                {data.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>
          )}

          {(data.tenthCollege || data.ugCollege) && (
            <section>
              <h2>Education</h2>
              {data.tenthCollege && <p><b>SSC:</b> {data.tenthCollege}</p>}
              {data.twelthCollege && <p><b>Intermediate:</b> {data.twelthCollege}</p>}
              {data.ugCollege && <p><b>UG:</b> {data.ugCollege}</p>}
              {data.pgCollege && <p><b>PG:</b> {data.pgCollege}</p>}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="right">
          {data.experience && (
            <section>
              <h2>Experience</h2>
              <p>{data.experience}</p>
            </section>
          )}

          {data.projects?.some(p => p.title || p.description) && (
            <section>
              <h2>Projects</h2>
              {data.projects.map((proj, i) =>
                (proj.title || proj.description) && (
                  <div key={i}>
                    {proj.title && <p><b>{proj.title}</b></p>}
                    {proj.description && <p>{proj.description}</p>}
                  </div>
                )
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate6;
