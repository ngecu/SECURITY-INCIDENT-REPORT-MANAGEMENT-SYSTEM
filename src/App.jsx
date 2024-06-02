import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Notifications } from 'react-push-notification'

import Login from './Screens/Login';
import NotFound from "./Screens/NotFound";
import IncidentReport from "./Screens/IncidentReport.jsx";
import PoliceLayout from "./Screens/Police/PoliceLayout.jsx";
import PoliceIndex from "./Screens/Police/Index.jsx";
import OccurenceBook from "./Screens/Police/OccurrenceBook.jsx";
import EvidenceRoom from "./Screens/Police/EvidenceRoom.jsx";
import DutyRotation from "./Screens/Police/DutyRotation.jsx";


function App() {

  return (
     
    <BrowserRouter>
    <Notifications />

    <Routes>
    <Route path="/" element={<Login />}/>
        
    <Route path="/report-incident" element={<IncidentReport /> } />
    <Route path="/police" element={<PoliceLayout/> } >
    <Route
          path=""
          element={<PoliceIndex />}
        />
           <Route
          path="ob"
          element={<OccurenceBook />}
        />

<Route
          path="evidence"
          element={<EvidenceRoom />}
        />

<Route
          path="duty_rotation"
          element={<DutyRotation />}
        />




    </Route>
    <Route path="*" element={<NotFound />} />
    </Routes>
 
   </BrowserRouter>

  )
}

export default App
