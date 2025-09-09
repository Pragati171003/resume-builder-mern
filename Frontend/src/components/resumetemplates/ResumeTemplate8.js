// // ResumeTemplate8.js
// import React from "react";

// function ResumeTemplate8({ data }) {
//   return (
//     <div style={{ display: "flex", fontFamily: "Tahoma", padding: "20px" }}>
//       <div style={{ width: "50%", paddingRight: "10px" }}>
//         <h1>{data.name}</h1>
//         <p>{data.email}<br />{data.countryCode + data.mobile}</p>
//         <h2>Skills</h2>
//         <p>{data.skills.join(", ")}</p>
//       </div>
//       <div style={{ width: "50%", paddingLeft: "10px" }}>
//         <h2>Education</h2>
//         {["tenth","twelth","ug","pg"].map(level => (
//           <p key={level}>{level.toUpperCase()}: {data.education[level].marks}, {data.education[level].college}, {data.education[level].year}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ResumeTemplate8;
