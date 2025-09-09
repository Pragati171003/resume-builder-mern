import {Header} from './layout/Header'
// import {Footer} from './layout/Footer'
import './App.css'
import SignUppage from "./pages/SignUppage";
import ResumeForm from './pages/ResumeForm.jsx';

function App() {
 

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