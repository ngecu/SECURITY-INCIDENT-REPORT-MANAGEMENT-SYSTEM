import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Login from './Screens/Login';
import IndexPoliceScreen from "./Screens/Police/IndexPoliceScreen";

import NotFound from "./Screens/NotFound";

import LostPasswordScreen from './Screens/LostPasswordScreen'
import NewPasswordScreen from './Screens/NewPasswordScreen'
import ReportIncidentScreen from "./Screens/ReportIncidentScreen";
import OccurenceBookScreen from "./Screens/Police/OccurenceBookScreen";
import EvidenceScreen from "./Screens/Police/EvidenceScreen";

function App() {

  return (
     
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login /> } exact />

    <Route path="/lost-password" element={<LostPasswordScreen/>} />
    <Route path="/report-incident" element={<ReportIncidentScreen/>} />

    <Route path="/new-password/:id/:token" element={<NewPasswordScreen/>} />


    <Route path="/police" element={<IndexPoliceScreen/> } />
    <Route path="/police/ob" element={<OccurenceBookScreen/> } />
    <Route path="/police/evidence" element={<EvidenceScreen/> } />

    
    <Route path="*" element={<NotFound />} />
    </Routes>
 
   </BrowserRouter>

  )
}

export default App
