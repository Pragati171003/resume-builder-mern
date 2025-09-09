import {Header} from './layout/Header'
import './App.css'
import { Loginpage } from './pages/Loginpage';
import AppRoutes from './AppRoutes'

function App() {
  return (
    <>
      <Header/>
      <Loginpage/>
      <AppRoutes />
    </>
  );
}



export default App;