import {Header} from './layout/Header'
import './App.css'
import AppRoutes from './AppRoutes'
import Homepage from './pages/Homepage'
import ResumeForm from './pages/ResumeForm'
import {Loginpage}from './pages/Loginpage'

function App() {
  return (
    <>
      <Header/>
      {/*<Loginpage/>*/}
      <AppRoutes />
      {/*<ResumeForm/>*/}
    </>
  );
}

export default App;

export default App;