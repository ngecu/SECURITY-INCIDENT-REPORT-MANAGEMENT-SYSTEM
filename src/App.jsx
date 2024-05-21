import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Login from './Screens/Login';
import IndexFinanceScreen from "./Screens/Finance/IndexFinanceScreen";
import SchoolFeesScreen from "./Screens/Finance/SchoolFeesScreen";
import RequisitionScreen from "./Screens/Finance/RequisitionScreen";
import TransactionScreen from "./Screens/Finance/TransactionScreen";
import FinanceProfileScreen from "./Screens/Finance/ProfileScreen";
import AllLeadsScreen from "./Screens/Marketing/AllLeadsScreen";
import MarketingProfileScreen from "./Screens/Marketing/MarketingProfileScreen";
import IndividualLeadScreen from "./Screens/Marketing/IndividualLeadScreen";
import MyLeadsScreen from "./Screens/Marketing/MyLeadsScreen";
import MyEnquiriesScreen from "./Screens/Marketing/MyEnquiriesScreen";
import MyClosedScreen from "./Screens/Marketing/MyClosedScreen";
import AllEmployeeScreen from "./Screens/Registrar/AllEmployeesScreen";
import AddEmployeeScreen from "./Screens/Registrar/AddEmployeeScreen";
import NewFeeStructure from "./Screens/Registrar/NewFeeStructure";
import AllStudentsScreen from "./Screens/Registrar/AllStudents";
import NotFound from "./Screens/NotFound";
import ReimbasmentScreen from "./Screens/Finance/ReimbasmentScreen";
import PettCashScreen from "./Screens/Finance/PettyCashScreen";
import IndividualStudentFeesScreen from "./Screens/Finance/IndividualStudentFeesScreen";
import RequestScreen from "./Screens/Marketing/RequestScreen";
import DepartmentRequestScreen from "./Screens/Marketing/DepartmentRequestScreen";
import FeePaymentScreen from "./Screens/Finance/FeePaymentScreen";
import VoteheadScreen from "./Screens/Finance/VoteheadScreen";
import FeeStructureScreen from "./Screens/Finance/FeeStructureScreen";
import FeeDebitScreen from "./Screens/Finance/FeeDebitScreen";
import PaymentRecordScreen from "./Screens/Finance/PaymentRecordScreen";
import FeeBalanceScreen from "./Screens/Finance/FeeBalanceScreen";
import AllMpesaScreen from "./Screens/Finance/AllMpesaScreen";
import FinanceRequestScreen from "./Screens/Finance/RequestScreen";
import FinanceDepartmentRequestScreen from "./Screens/Registrar/DepartmentRequestScreen";
import TermScheduleScreen from "./Screens/Registrar/TermScheduleScreen";
import FeeStructureScreenRegistrar from "./Screens/Registrar/FeeStructureScreenRegistrar";
import VoteheadScreenRegistrar from "./Screens/Registrar/VoteheadScreenRegistrar";
import RequestRegistrarScreen from "./Screens/Registrar/RequestScreen";
import RegistrarProfileScreen from "./Screens/Registrar/RegistrarProfileScreen";
import LostPasswordScreen from './Screens/LostPasswordScreen'
import NewPasswordScreen from './Screens/NewPasswordScreen'
import StudentExamScreen from "./Screens/Student/studentExamScreen";
import TrainerExamScreen from "./Screens/Trainer/trainerExamScreen";
import ExaminerExamScreen from "./Screens/Examiner/examinerExamScreen";
import ExaminerToPrintScreen from "./Screens/Examiner/examinerToPrintScreen";
import StudentAttendanceScreen from "./Screens/Student/studentAttendanceScreen";
import StudentRoutineScreen from "./Screens/Student/studentRoutineScreen";
import StudentFeedbackScreen from "./Screens/Student/studentFeedbackScreen";
import StudentScheduleScreen from "./Screens/Student/studentScheduleScreen";
import StudentGradeScreen from "./Screens/Student/studentGradeScreen";
import TrainerScheduleScreen from "./Screens/Trainer/trainerScheduleScreen";
import TrainerRoutineScreen from "./Screens/Trainer/trainerRoutineScreen";
import TrainerRequestScreen from "./Screens/Trainer/trainerRequestScreen";
import TrainerFeedbackScreen from "./Screens/Trainer/trainerFeedbackScreen";
import TrainerExamGradeScreen from "./Screens/Trainer/trainerExamGradeScreen";
import ReportIncidentScreen from "./Screens/ReportIncidentScreen";

function App() {

  return (
     
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login /> } exact />

    <Route path="/lost-password" element={<LostPasswordScreen/>} />
    <Route path="/report-incident" element={<ReportIncidentScreen/>} />

    <Route path="/new-password/:id/:token" element={<NewPasswordScreen/>} />

    {/* FINANCE ROUTES  */}
    <Route path="/finance" element={<IndexFinanceScreen/> } />
    <Route path="/finance/school_fees" element={<SchoolFeesScreen/> } />
    <Route path="/finance/school_fees/:id" element={<IndividualStudentFeesScreen/> } />
    <Route path="/finance/requisitions" element={<RequisitionScreen/> } />
    <Route path="/finance/transactions" element={<TransactionScreen/> } />
    <Route path="/finance/reimbasments" element={<ReimbasmentScreen/> } />
    <Route path="/finance/petty_cash" element={<PettCashScreen/> } />
    <Route path="/finance/fee_payment" element={<FeePaymentScreen/> } />
    <Route path="/finance/requests" element={<FinanceRequestScreen/> } />
    <Route path="/finance/department_requests" element={<FinanceDepartmentRequestScreen/> } />
    <Route path="/finance/fee_invoicing/voteheads" element={<VoteheadScreen/> } />
    <Route path="/finance/fee_invoicing/fee_structure" element={<FeeStructureScreen/> } />
    <Route path="/finance/fee_invoicing/fee_debit" element={<FeeDebitScreen/> } />
    <Route path="/finance/fee_records/payments" element={<PaymentRecordScreen/> } />
    <Route path="/finance/fee_records/fee_balance" element={<FeeBalanceScreen/> } />
    <Route path="/finance/fee_records/mpesa" element={<AllMpesaScreen/> } />
    <Route path="/finance/profile" element={<FinanceProfileScreen/> } />

    {/* MARKETING ROUTES  */}
    <Route path="/marketing/all_leads" element={<AllLeadsScreen/> } />
    <Route path="/marketing/all_leads/:id" element={<IndividualLeadScreen/> } />
    <Route path="/marketing/my_leads/:id" element={<IndividualLeadScreen/> } />
    <Route path="/marketing/my_leads" element={<MyLeadsScreen/> } />
    <Route path="/marketing/my_enquiries" element={<MyEnquiriesScreen/> } />
    <Route path="/marketing/my_closed" element={<MyClosedScreen/> } />
    <Route path="/marketing/profile" element={<MarketingProfileScreen/> } />
    <Route path="/marketing/requests" element={<RequestScreen/> } />
    <Route path="/marketing/department_requests" element={<DepartmentRequestScreen/> } />
    

    {/* REGISTRAR ROUTES  */}
    <Route path="/registrar/all_employees" element={<AllEmployeeScreen/> } />
    <Route path="/registrar/all_students" element={<AllStudentsScreen/> } />
    <Route path="/registrar/term_schedule" element={<TermScheduleScreen/> } />
    <Route path="/registrar/voteheads" element={<VoteheadScreenRegistrar/> } />
    <Route path="/registrar/fee_structure" element={<FeeStructureScreenRegistrar/> } />
    <Route path="/registrar/add_employee" element={<AddEmployeeScreen/> } />   
    <Route path="/registrar/new_fee_structure" element={<NewFeeStructure/> } />   
    <Route path="/registrar/requests" element={<RequestRegistrarScreen/> } />
    <Route path="/registrar/profile" element={<RegistrarProfileScreen/> } />


    {/* STUDENT ROUTES  */}
    <Route path="/student/exam_application" element={<StudentExamScreen/> } />
    <Route path="/student/attendance" element={<StudentAttendanceScreen/> } />
    <Route path="/student/routine" element={<StudentRoutineScreen/> } />
    <Route path="/student/feedback" element={<StudentFeedbackScreen/> } />
    <Route path="/student/exam_schedule" element={<StudentScheduleScreen/> } />
    <Route path="/student/exam_grades" element={<StudentGradeScreen/> } />

    
    {/* TRAINER ROUTES  */}
    <Route path="/trainer/exams" element={<TrainerExamScreen/> } />
    <Route path="trainer/exam_schedule" element={<TrainerScheduleScreen/> } />
    <Route path="trainer/routine" element={<TrainerRoutineScreen/> } />
    <Route path="/trainer/feedback" element={<TrainerFeedbackScreen/> } />
    <Route path="/trainer/requests" element={<TrainerRequestScreen/> } />
    <Route path="/trainer/exam_grades" element={<TrainerExamGradeScreen/> } />

    
    
    {/* EXAMINER ROUTES  */}
    <Route path="/examiner/exam_applications" element={<ExaminerExamScreen/> } />
    <Route path="/examiner/to_print" element={<ExaminerToPrintScreen/> } />

  
    <Route path="*" element={<NotFound />} />
    </Routes>
 
   </BrowserRouter>

  )
}

export default App
