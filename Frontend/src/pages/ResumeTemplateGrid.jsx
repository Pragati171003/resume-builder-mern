
import "./ResumeTemplateGrid.css";


import ReactDOMServer from "react-dom/server";

import { useState } from "react";
const defaultResumeData = {
  name: "Jhon Deo",
  email: "jhon@example.com",
  mobile: "+91 9876543210",
  linkedin: "linkedin.com/in/jhondeo",
  gitlab: "gitlab.com/jhondeo",
  skills: ["React", "Node.js", "JavaScript", "C++"],
  tenthCollege: "St. Mary’s High School - 2015",
  twelthCollege: "Narayana Junior College - 2017",
  ugCollege: "B.Tech in ECE, JNTU Hyderabad - 2021",
  experience: "Software Engineer Intern @ TechCorp (2022-2023)",
  projects: [
    { title: "Portfolio Website", description: "Built a portfolio using React." },
    { title: "E-Commerce App", description: "Developed a MERN stack e-commerce application." },
  ],
};




const TEMPLATE_COMPONENTS = [
  
  { id: "template-html3", title: "Flat", type: "html", url: "/templates/flat.html" },
  { id: "template-html1", title: "elegant",type: "html", url: "/templates/elegant.html" },
  { id: "template-html2", title: "caffeine Html",type: "html", url: "/templates/caffeine.html" },
  { id: "template-html3", title: "spartan Html",type: "html", url: "/templates/spartan.html" },
  { id: "template-html4", title: "kendall Html",type: "html", url: "/templates/kendall.html" },
  { id: "template-html5", title: "onepage Html",type: "html", url: "/templates/onepage.html" },
  { id: "template-html6", title: "microdata",type: "html", url: "/templates/microdata.html" },
  { id: "template-html7", title: "modern Html",type: "html", url: "/templates/modern.html" },
  { id: "template-html8", title: "onepage Html",type: "html", url: "/templates/onepage.html" },
  { id: "template-html9", title: "short Html",type: "html", url: "/templates/resume_short.html" },
  { id: "template-html10", title: "resume_microdata Html",type: "html", url: "/templates/resume_microdata.html" },
  { id: "template-html11", title: "slick Html",type: "html", url: "/templates/resume_slick.html" },
  { id: "template-html12", title: "stackoverflow Html",type: "html", url: "/templates/stackoverflow.html" },
  { id: "template-html14", title: "Class",type: "html", url: "/templates/resume_class.html" },
  
   
];

export default function ResumeTemplateGrid() {
  const [selected, setSelected] = useState(TEMPLATE_COMPONENTS[0].id);


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
                 <div className="template-preview">
  {t.type === "json" ? (
    <iframe
      className="iframe-preview"
      srcDoc={`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 10px; }
              h2 { margin: 0 0 4px 0; }
              p { margin: 0 0 6px 0; }
            </style>
          </head>
          <body>
            <h2>${t.data.basics.name}</h2>
            <p>${t.data.basics.label}</p>
            <p>${t.data.basics.email}</p>
          </body>
        </html>
      `}
      title={t.title}
    />
  ) : t.type === "html" ? (
    <iframe
      className="iframe-preview"
      src={t.url}   // ✅ loads raw HTML file
      title={t.title}
    />
  ) : (
    <iframe
      className="iframe-preview"
      srcDoc={`
        <html>
          <body>
            ${ReactDOMServer.renderToString(<t.Component data={defaultResumeData} />)}
          </body>
        </html>
      `}
      title={t.title}
    />
  )}
</div>




            </div>
          );
        })}
      </div>

<div className="button-container">
  <button
    onClick={() => {
      const selectedTemplate = TEMPLATE_COMPONENTS.find(t => t.id === selected);

      if (selectedTemplate.type === "html") {
        // Open the full HTML resume in a new tab
        window.open(selectedTemplate.url, "_blank");
      } else {
        // For React/JSON templates, just show alert (or you can render/export)
        alert(`You chose: ${selectedTemplate.title}`);
      }
    }}
    className="choose-btn"
  >
    Choose Template
  </button>
</div>

    </div>
  );
}