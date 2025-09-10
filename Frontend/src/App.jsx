// import {Header} from './layout/Header'

// // import {Footer} from './layout/Footer'
// import './App.css'

// import React, { useState } from "react";
// import ResumeForm from './pages/ResumeForm'
// import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2'
// import ResumeTemplate from './components/resumetemplates/ResumeTemplate2';

// function App() {
//   const [submittedData, setSubmittedData] = useState(null);

//   return (
//     <div>
      
     
//       {!submittedData ? (
//         <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
//       ) : (
//         <ResumeTemplate2 data={submittedData} />
//       )}
//     </div>
//   );
// }
// export default App;


// // import React, { useState } from "react";
// import ResumeForm from './pages/ResumeForm';

// import ResumeTemplate1 from './components/resumetemplates/ResumeTemplate1';
// import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2';
// import ResumeTemplate3 from './components/resumetemplates/ResumeTemplate3';
// import ResumeTemplate4 from './components/resumetemplates/ResumeTemplate4';
// import ResumeTemplate5 from './components/resumetemplates/ResumeTemplate5';
// import ResumeTemplate6 from './components/resumetemplates/ResumeTemplate6';
// import ResumeTemplate7 from './components/resumetemplates/ResumeTemplate7';

// function App() {
//   const [submittedData, setSubmittedData] = useState(null);
//   const [currentTemplate, setCurrentTemplate] = useState("ResumeTemplate1");

//   const templatesMap = {
//     ResumeTemplate1,
//     ResumeTemplate2,
//     ResumeTemplate3,
//     ResumeTemplate4,
//     ResumeTemplate5,
//     ResumeTemplate6,
//     ResumeTemplate7,
//   };

//   const SelectedTemplateComponent = templatesMap[currentTemplate] || ResumeTemplate1;

//   return (
//     <div style={{ padding: "20px" }}>
//       {!submittedData ? (
//         <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
//       ) : (
//         <>
//           {/* Dropdown to switch templates */}
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="templateSelect" style={{ marginRight: "10px" }}>
//               Select Template:
//             </label>
//             <select
//               id="templateSelect"
//               value={currentTemplate}
//               onChange={(e) => setCurrentTemplate(e.target.value)}
//               style={{ padding: "6px", fontSize: "16px" }}
//             >
//               {Object.keys(templatesMap).map((temp) => (
//                 <option key={temp} value={temp}>
//                   {temp.replace("ResumeTemplate", "Template ")}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Display selected template */}
//           <SelectedTemplateComponent data={submittedData} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// App.jsx



// Import templates (from your earlier ResumeTemplateGrid)


import React, { useState } from "react";

// ResumeTemplateGrid.jsx
// Displays multiple resume templates directly as small sample components in a grid.
// Includes 10 sample templates. Clicking a card selects it.
// One global "Choose Template" button for the selected template.
// ResumeTemplateGrid.jsx

import "./App.css";
import ResumeTemplateGrid from "./pages/ResumeTemplateGrid";

function App(){
  return(
    <>
    <ResumeTemplateGrid/>
    </>
  );
}
export default App;


