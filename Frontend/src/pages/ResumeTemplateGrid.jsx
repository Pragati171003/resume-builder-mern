import React from 'react';
import "./ResumeTemplateGrid.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  { id: "tech", title: "Tech",type: "html", url: "/templates/tech.html" },
  { id: "flat", title: "Flat", type: "html", url: "/templates/flat.html" },
  { id: "elegant", title: "Elegant",type: "html", url: "/templates/elegant.html" },
  { id: "caffeine", title: "Caffeine ",type: "html", url: "/templates/caffeine.html" },
  { id: "spartan", title: "Spartan ",type: "html", url: "/templates/spartan.html" },
  { id: "kendall", title: "Kendall ",type: "html", url: "/templates/kendall.html" },
  { id: "onepage", title: "Onepage ",type: "html", url: "/templates/onepage.html" },
  { id: "short", title: "Short",type: "html", url: "/templates/resume_short.html" },
  { id: "stackoverflow", title: "Stackoverflow",type: "html", url: "/templates/stackoverflow.html" },
  { id: "class", title: "Class",type: "html", url: "/templates/resume_class.html" },
  { id: "boilerplate", title: "Boilerplate",type: "html", url: "/templates/boilerplate-preview.html" },
  { id: "bufferbloat", title: "Bufferbloat ",type: "html", url: "/templates/bufferbloat.html" },
  { id: "moon", title: "Moon",type: "html", url: "/templates/moon.html" },
  { id: "compact", title: "Comapct",type: "html", url: "/templates/compact.html" },
  { id: "cora", title: "Cora",type: "html", url: "/templates/cora.html" },
  { id: "macchiato", title: "Macchiato",type: "html", url: "/templates/macchiato.html" },
  
   
];

export default function ResumeTemplateGrid() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleTemplateSelect = (templateId) => {
    setSelected(templateId);
    const targetUrl = `/editor/new?template=${templateId}`;
    if (isLoggedIn) {
      navigate(targetUrl);
    } else {
      navigate(`/login?redirectTo=${encodeURIComponent(targetUrl)}`);
    }
  };


  return (
    <div className="resume-builder">
      <div className="container">
      <h2 className="heading">Choose a resume template</h2>

      <div className="grid">
        {TEMPLATE_COMPONENTS.map((t) => {
          const Component = t.Component;
          return (
            <div
              key={t.id}
              className={`card ${selected === t.id ? "selected" : ""}`}
              onClick={() => handleTemplateSelect(t.id)}
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
      src={t.url}   
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
  
</div>

    </div>

    </div>
  );
}