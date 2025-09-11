import ResumeTemplate1 from "../components/resumetemplates/ResumeTemplate1";
import ResumeTemplate2 from "../components/resumetemplates/ResumeTemplate2";
import ResumeTemplate3 from "../components/resumetemplates/ResumeTemplate3";
import ResumeTemplate4 from "../components/resumetemplates/ResumeTemplate4";
import ResumeTemplate5 from "../components/resumetemplates/ResumeTemplate5";
import ResumeTemplate6 from "../components/resumetemplates/ResumeTemplate6";
import ResumeTemplate7 from "../components/resumetemplates/ResumeTemplate7";
import "./ResumeTemplateGrid.css";
import classicJSON from "../components/resumetemplates/classic.json";
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

// const TemplateThree = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Alex Johnson"}</h2>
//     <p>{data.title || "Data Analyst"}</p>
//   </div>
// );

// const TemplateFour = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Emily Clark"}</h2>
//     <p>{data.title || "Marketing Specialist"}</p>
//   </div>
// );

// const TemplateFive = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Michael Lee"}</h2>
//     <p>{data.title || "Project Manager"}</p>
//   </div>
// );

// const TemplateSix = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Sophia Patel"}</h2>
//     <p>{data.title || "HR Executive"}</p>
//   </div>
// );

// const TemplateSeven = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Chris Brown"}</h2>
//     <p>{data.title || "Graphic Designer"}</p>
//   </div>
// );

// const TemplateEight = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Olivia Green"}</h2>
//     <p>{data.title || "Content Writer"}</p>
//   </div>
// );

// const TemplateNine = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "David Wilson"}</h2>
//     <p>{data.title || "Finance Analyst"}</p>
//   </div>
// );

// const TemplateTen = ({ data }) => (
//   <div className="template-box">
//     <h2>{data.name || "Emma Johnson"}</h2>
//     <p>{data.title || "Cybersecurity Specialist"}</p>
//   </div>
// );

const TEMPLATE_COMPONENTS = [
  { id: "template-json", title: "Classic Json",type: "json", data: classicJSON },
  { id: "template-2", title: "Modern", Component: TemplateTwo },
  { id: "template-3", title: "Minimal", Component: ResumeTemplate7 },
  { id: "template-4", title: "Creative", Component: ResumeTemplate6 },
  { id: "template-5", title: "Professional", Component: ResumeTemplate5 },
  { id: "template-6", title: "Simple", Component: ResumeTemplate4 },
  { id: "template-7", title: "Elegant", Component: ResumeTemplate4 },
  { id: "template-8", title: "Stylish", Component: ResumeTemplate3 },
  { id: "template-9", title: "Corporate", Component: ResumeTemplate3 },
  { id: "template-10", title: "Tech", Component: ResumeTemplate2 },
  { id: "template-11", title: "Tech", Component: ResumeTemplate1 },
  { id: "template-json", title: "Classic Json",type: "json", data: classicJSON },
];

export default function ResumeTemplateGrid() {
  const [selected, setSelected] = useState(TEMPLATE_COMPONENTS[0].id);
//   const resumeData = {
//     name: "Anoohya Bachu",
//     title: "ECE Graduate | Aspiring Software Developer",
//     mail: "xyz@gmail.com",
//   };

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
            <h3>Education</h3>
            <p>${t.data.education[0].studyType} in ${t.data.education[0].area} - ${t.data.education[0].institution}</p>
            <h3>Skills</h3>
            <p>${t.data.skills[0].keywords.join(", ")}</p>
          </body>
        </html>
      `}
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
          onClick={() => alert(`You chose: ${selected}`)}
          className="choose-btn"
        >
          Choose Template
        </button>
      </div>
    </div>
  );
}