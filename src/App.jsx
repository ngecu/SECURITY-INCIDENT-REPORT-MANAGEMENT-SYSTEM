import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Login from './Screens/Login';
import NotFound from "./Screens/NotFound";
import IncidentReport from "./Screens/SignUp.jsx";
import PoliceLayout from "./Screens/Police/PoliceLayout.jsx";
import PoliceIndex from "./Screens/Police/Index.jsx";
import OccurenceBook from "./Screens/Police/OccurrenceBook.jsx";
import DutyRotation from "./Screens/Police/DutyRotation.jsx";
import CivilianLayout from "./Screens/Civilian/CivilianLayout.jsx";
import CivilianIndex from "./Screens/Civilian/Index.jsx";
import CivilianIncidentReport from "./Screens/Civilian/IncidentReport.jsx";
import SignUp from "./Screens/SignUp.jsx";


function App() {

  return (
     
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
        
    <Route path="/sign-up" element={<SignUp /> } />
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
          path="duty_rotation"
          element={<DutyRotation />}
        />




    </Route>

    <Route path="/civilian" element={<CivilianLayout/> } >
    <Route
          path=""
          element={<CivilianIndex />}
        />
          

<Route
          path="incidents"
          element={<CivilianIncidentReport />}
        />




    </Route>

    <Route path="*" element={<NotFound />} />
    </Routes>
 
   </BrowserRouter>

  )
}

export default App
