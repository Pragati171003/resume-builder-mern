import {Loginpage}from './pages/Loginpage'
import {Header} from './layout/Header'
import {Footer} from './layout/Footer'
import './App.css'
import { Body } from './layout/Body'
import ResumeForm from './pages/ResumeForm'
import FAQ from './layout/FAQ'

function App() {

  return (
    <>
      <Loginpage/>
      <Header/>
      <Body/>
      <FAQ/>
      <Footer/>
      
      <ResumeForm/>
    </>
  )
}

export default App
