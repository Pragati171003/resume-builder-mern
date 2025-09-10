import React from "react";
import "./ResumeTemplate7.css";

function ResumeTemplate7({ data }) {
  return (
    <div className="resume-7">
      <header>
        {data.name && <h1>{data.name}</h1>}
        <div className="contact">
          {data.email && <span>{data.email}</span>}
          {data.mobile && <span> | {data.mobile}</span>}
          {data.linkedin && <span> | {data.linkedin}</span>}
        </div>
      </header>

      <div className="timeline">
        {(data.tenthCollege || data.ugCollege) && (
          <section>
            <h2>Education</h2>
            <ul>
              {data.tenthCollege && <li><b>SSC:</b> {data.tenthCollege}</li>}
              {data.twelthCollege && <li><b>Intermediate:</b> {data.twelthCollege}</li>}
              {data.ugCollege && <li><b>UG:</b> {data.ugCollege}</li>}
              {data.pgCollege && <li><b>PG:</b> {data.pgCollege}</li>}
            </ul>
          </section>
        )}

        {data.experience && (
          <section>
            <h2>Experience</h2>
            <p>{data.experience}</p>
          </section>
        )}

        {data.projects?.some(p => p.title || p.description) && (
          <section>
            <h2>Projects</h2>
            <ul>
              {data.projects.map((proj, i) =>
                (proj.title || proj.description) && (
                  <li key={i}>
                    <b>{proj.title}</b> - {proj.description}
                  </li>
                )
              )}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumeTemplate7;
