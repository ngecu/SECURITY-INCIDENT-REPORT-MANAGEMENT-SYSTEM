import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Screens/Login';
import NotFound from "./Screens/NotFound";
import IncidentReport from "./Screens/IncidentReport.jsx";


function App() {

  return (
     
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login /> } exact />
    <Route path="/report-incident" element={<IncidentReport /> } />
    
    <Route path="*" element={<NotFound />} />
    </Routes>
 
   </BrowserRouter>

  )
}

export default App
