// // ResumeTemplate3.js
// import React from "react";

// function ResumeTemplate3({ data }) {
//   return (
//     <div style={{ display: "flex", fontFamily: "Tahoma", padding: "20px" }}>
//       <div style={{ width: "30%", paddingRight: "15px" }}>
//         <h2>{data.name}</h2>
//         <p>{data.email}<br />{data.countryCode + data.mobile}</p>
//         <h3>Skills</h3>
//         <p>{data.skills.join(", ")}</p>
//       </div>
//       <div style={{ width: "70%" }}>
//         <h2>Education</h2>
//         {["tenth","twelth","ug","pg"].map(level => (
//           <div key={level}>{level.toUpperCase()}: {data.education[level].marks}, {data.education[level].college}, {data.education[level].year}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ResumeTemplate3;
