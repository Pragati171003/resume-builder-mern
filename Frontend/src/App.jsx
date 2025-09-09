// import { Header } from './layout/Header';
// import { Footer } from './layout/Footer';
import { useState } from 'react';
import './App.css';
// import SignUppage from "./pages/SignUppage";
import ResumeForm from './pages/ResumeForm.jsx';
//import ResumeTemplate2 from './components/ResumeTemplate2.jsx'; // <-- import added
import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2.jsx';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div>
      {!submittedData ? (
        <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
      ) : (
        <ResumeTemplate2 data={submittedData} />
      )}
    </div>
  );
}

export default App;
