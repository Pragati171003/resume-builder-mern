# CVCraft - A Full-Stack MERN Resume Builder

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://resumebuilder-chi-rouge.vercel.app)
&nbsp;
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
&nbsp;
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

A full-stack, MERN-based web application designed to provide a seamless, real-time resume editing experience. CVCraft allows users to build, style, and save professional resumes with an instant what you see is what you get (WYSIWYG) preview.

**The core mission of this project was to solve a real-world problem: building a complex, state-intensive, single-page application and deploying it with a professional, hybrid architecture.**

![CVCraft Live Preview GIF](https://github.com/user-attachments/assets/4795d108-1b85-472f-b213-c763944e79a8)

---

### Core Features

*   **Real-Time WYSIWYG Editor:** A dynamic three-column layout featuring a smart form with live validation, an `<iframe>` preview that updates on every keystroke, and a powerful styling toolbar.
*   **Seamless "Guest Mode":** Users can build an entire resume without an account. The application intelligently prompts for login only when a user tries to save or download, then seamlessly redirects them back to their work.
*   **Secure User Authentication:** A complete authentication system built from scratch with JWT for token-based security, `bcrypt` for password hashing, and automated email notifications for password resets.
*   **Dynamic Theme Rendering:** A dedicated Node.js microservice that leverages the `jsonresume-theme` ecosystem to render dozens of professional templates on the server-side, providing instant visual feedback.
*   **Professional Email System:** All transactional emails (password resets, user inquiries, testimonial notifications) are handled through a professional, API-based email service (Brevo) to ensure high deliverability in a production environment.

---

### Tech Stack & Architecture

This project is deployed using a professional, hybrid "monorepo" strategy to use the best tool for each job:

*   **Frontend (Vercel):** The React frontend is deployed as a static site on **Vercel** for optimal performance and global availability. It includes SPA rewrite rules to handle client-side routing. [resumebuilder-chi-rouge.vercel.app](https://resumebuilder-chi-rouge.vercel.app)
*   **Backend Services (Render):** Both the main **Backend API Server** (Node.js/Express) and the **Resume Renderer Server** are deployed as separate web services on **Render**, creating a decoupled and scalable microservice architecture. [cvcraft-backend-kmki.onrender.com](https://cvcraft-backend-kmki.onrender.com)

| Category      | Technologies                                            |
|---------------|---------------------------------------------------------|
| **Frontend**  | React.js, Vite, React Router, Context API, Axios, `html2canvas`, `jsPDF` |
| **Backend**   | Node.js, Express.js, Mongoose                           |
| **Database**  | MongoDB Atlas                                           |
| **Email**     | Brevo (formerly Sendinblue)                             |
| **Deployment**| Vercel (Frontend), Render (Backend Services)            |

---
### Key Challenges & Solutions

This project was a deep dive into solving real-world development challenges:

1.  **Complex State Management:** The biggest challenge was keeping the form, the live preview, and the styling tools perfectly in sync across multiple components. I solved this by implementing the **React Context API** as a centralized, global state manager, which acts as the single source of truth for the entire application.

2.  **Deployment & CORS:** Deploying a full-stack monorepo to separate services (Vercel and Render) is a professional pattern, but it introduces major challenges. I solved the inevitable `CORS (Cross-Origin Resource Sharing)` errors by implementing a magnificent, professional, and secure "allow list" on the backend server, allowing it to trust requests from both my local machine and the live Vercel domain.

3.  **Production Email Deliverability:** My initial implementation using Nodemailer and Gmail was magnificent for local development but was **blocked by the Render server's firewall** in production. This is a classic deployment problem. I solved this by re-architecting the entire email system to use a professional, API-based transactional email service (**Brevo**), which is the industry-standard solution for ensuring reliable email delivery from a cloud platform.

---

### Local Setup

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pragati171003/resume-builder-mern.git
    cd resume-builder-mern
    ```

2.  **Setup the Backend:**
    *   Navigate to the `Backend` directory, run `npm install`, create a `.env` file with your magnificent keys, and run `npm run dev`.

3.  **Setup the Frontend:**
    *   Navigate to the `Frontend` directory, run `npm install`, create a `.env` file with your magnificent `VITE_API_URL`, and run `npm run dev`.
