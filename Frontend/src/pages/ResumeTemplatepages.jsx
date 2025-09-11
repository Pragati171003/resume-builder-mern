// ResumeTemplateGrid.jsx
import React, { useState } from "react";
import "./ResumeTemplateGrid.css";

const TemplateOne = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "John Doe"}</h2>
    <p>{data.title || "Software Engineer"}</p>
  </div>
);

const TemplateTwo = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Jane Smith"}</h2>
    <i>{data.title || "UI/UX Designer"}</i>
  </div>
);

const TemplateThree = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Alex Johnson"}</h2>
    <p>{data.title || "Data Analyst"}</p>
  </div>
);

const TemplateFour = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Emily Clark"}</h2>
    <p>{data.title || "Marketing Specialist"}</p>
  </div>
);

const TemplateFive = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Michael Lee"}</h2>
    <p>{data.title || "Project Manager"}</p>
  </div>
);

const TemplateSix = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Sophia Patel"}</h2>
    <p>{data.title || "HR Executive"}</p>
  </div>
);

const TemplateSeven = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Chris Brown"}</h2>
    <p>{data.title || "Graphic Designer"}</p>
  </div>
);

const TemplateEight = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Olivia Green"}</h2>
    <p>{data.title || "Content Writer"}</p>
  </div>
);

const TemplateNine = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "David Wilson"}</h2>
    <p>{data.title || "Finance Analyst"}</p>
  </div>
);

const TemplateTen = ({ data }) => (
  <div className="template-box">
    <h2>{data.name || "Emma Johnson"}</h2>
    <p>{data.title || "Cybersecurity Specialist"}</p>
  </div>
);

const TEMPLATE_COMPONENTS = [
  { id: "template-1", title: "Classic", Component: TemplateOne },
  { id: "template-2", title: "Modern", Component: TemplateTwo },
  { id: "template-3", title: "Minimal", Component: TemplateThree },
  { id: "template-4", title: "Creative", Component: TemplateFour },
  { id: "template-5", title: "Professional", Component: TemplateFive },
  { id: "template-6", title: "Simple", Component: TemplateSix },
  { id: "template-7", title: "Elegant", Component: TemplateSeven },
  { id: "template-8", title: "Stylish", Component: TemplateEight },
  { id: "template-9", title: "Corporate", Component: TemplateNine },
  { id: "template-10", title: "Tech", Component: TemplateTen },
];

export default function ResumeTemplateGrid() {
  const [selected, setSelected] = useState(TEMPLATE_COMPONENTS[0].id);
  const resumeData = {
    name: "Anoohya Bachu",
    title: "ECE Graduate | Aspiring Software Developer",
  };

  return (
    <div className="container">
      <h2 className="heading">Choose a resume template</h2>

      <div className="grid">
        {TEMPLATE_COMPONENTS.map((t) => {
          const Component = t.Component;
          return (
            <div
              key={t.id}
              className={`card ${selected === t.id ? "selected" : ""}`}
              onClick={() => setSelected(t.id)}
            >
              <h3 className="card-title">{t.title}</h3>
              <Component data={resumeData} />
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <button
          onClick={() => alert(`You chose: ${selected}`)}
          className="choose-btn"
        >
          Choose Template
        </button>
      </div>
    </div>
  );
}
