import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  userResetPasswordReducer,
  userChangePasswordReducer,
  userToggleActiveReducer,
  employeeListReducer,
} from './reducers/userReducers';
import { MyMarketLeadsReducer, allMarketLeadsReducer, individualMarketLeadReducer, marketLeadRegisterReducer, updateMarketLeadsStatusReducer } from './reducers/marketLeadReducers';
import { addCommentReducer, allCommentsReducer, commentsByAgentReducer, commentsByLeadReducer, fetchAllTodaysCommentsReducer, fetchMyTodaysCommentsReducer } from './reducers/commentReducer';
import { accountantDeleteReducer, accountantDetailsReducer, accountantListReducer, accountantRegisterReducer, accountantResetReducer, accountantUpdateReducer } from './reducers/accountantReducer';
import { allSchoolsReducer, individualSchoolReducer } from './reducers/schoolReducers';
import { allStudentsReducer, individualStudentReducer } from './reducers/studentReducers';
import { createFeeStructureReducer, deleteFeeStructureReducer, getAllFeeStructuresReducer, getFeeStructureReducer, updateFeeStructureReducer } from './reducers/feeReducers';
import { courseCreateReducer, courseDeleteReducer, courseDetailsReducer, courseListReducer, courseUpdateReducer } from './reducers/courseReducers';
import { allFeePaymentTransactionsReducer, paySchoolFeesReducer, transactionCreateReducer, transactionCreditAllReducer, transactionDeleteReducer, transactionDetailsReducer, transactionListReducer, transactionUpdateReducer, transactionsByStudentReducer } from './reducers/transactionReducers';
import { allRequisitionsReducer, departmentRequisitionListReducer, individualRequisitionReducer, requisitionApproveReducer, requisitionCreateReducer } from './reducers/requisitionReducers';
import { allReimbursementsReducer, individualReimbursementReducer, reimbursementCreateReducer } from './reducers/reimbursmentReducers';
import { allPettycashReducer, individualPettycashReducer, pettycashCreateReducer } from './reducers/pettycashReducers';
import { mpesaReducer } from './reducers/mpesaReducers';
import { leaveCreateReducer, leaveDeleteReducer, leaveDetailsReducer, leaveListReducer, leaveUpdateReducer, leaveUserDetailsReducer } from './reducers/leaveReducers';
import { agentCreateReducer, agentDeleteReducer, agentDetailsReducer, agentListReducer, agentUpdateReducer } from './reducers/agentReducers';
import { voteheadCreateReducer, voteheadDeleteReducer, voteheadDetailsReducer, voteheadListReducer, voteheadUpdateReducer } from './reducers/voteheadReducers';
import { termDateCreateReducer, termDateDeleteReducer, termDateDetailsReducer, termDateUpdateReducer, termDatesListReducer } from './reducers/termDatesReducers';
import { eventAddReducer, eventDeleteReducer, eventUpdateReducer } from './reducers/eventsReducers';
import { externalExamFormReducer, externalExamListReducer, specialExamFormReducer, specialExamListReducer, submitexternalExamFormReducer, submitspecialExamFormReducer, submitsupplementaryExamFormReducer, supplementaryExamFormReducer, supplementaryExamListReducer } from './reducers/examformReducers';
import { createFeedbackReducer, deleteFeedbackReducer, fetchAllFeedbackReducer, fetchFeedbackReducer, updateFeedbackReducer } from './reducers/feedbackReducers';
import { examCreateReducer, examDeleteReducer, examUpdateReducer, getAllExamsReducer, getExamDetailsReducer } from './reducers/examReducers';

const reducer = combineReducers({
  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userResetPassword: userResetPasswordReducer,
  userChangePassword: userChangePasswordReducer,
  userTogleActive:userToggleActiveReducer,


  allEmployees:employeeListReducer,

  // Accountant reducers
  accountantRegister: accountantRegisterReducer,
  accountantList: accountantListReducer,
  accountantDetails: accountantDetailsReducer,
  accountantUpdate: accountantUpdateReducer,
  accountantDelete: accountantDeleteReducer,
  accountantReset: accountantResetReducer,

  registerLead:marketLeadRegisterReducer,
  allLeads:allMarketLeadsReducer,
  individualMarketLead:individualMarketLeadReducer,
  MyMarketLeads:MyMarketLeadsReducer,
  updateMarketLeadStatus:updateMarketLeadsStatusReducer,

  addCommentR:addCommentReducer,
  commentsByLead: commentsByLeadReducer,
    commentsByAgent: commentsByAgentReducer,
    allComments: allCommentsReducer,
    myTodaysComments:fetchMyTodaysCommentsReducer,
    fetchAllTodaysComments:fetchAllTodaysCommentsReducer,

  allSchools:allSchoolsReducer,
  individualSchool:individualSchoolReducer,

  allStudents:allStudentsReducer,
  individualStudent:individualStudentReducer,

   // Fee structure reducers
   createFeeStructure: createFeeStructureReducer,
   getAllFeeStructures: getAllFeeStructuresReducer,
   getFeeStructureById: getFeeStructureReducer,
   updateFeeStructure: updateFeeStructureReducer,
   deleteFeeStructure: deleteFeeStructureReducer,

   //Course Reducers
   courseList: courseListReducer,
   courseDetails: courseDetailsReducer,
   courseCreate: courseCreateReducer,
   courseUpdate: courseUpdateReducer,
   courseDelete: courseDeleteReducer,

   transactionCreate: transactionCreateReducer,
   transactionList: transactionListReducer,
   transactionDetails: transactionDetailsReducer,
   transactionUpdate: transactionUpdateReducer,
   transactionDelete: transactionDeleteReducer,
   transactionCreditAll: transactionCreditAllReducer,
   transactionsByStudent:transactionsByStudentReducer,
   allFeePaymentTransactions:allFeePaymentTransactionsReducer,
   paySchoolFeesR:paySchoolFeesReducer,

   requisitionCreate: requisitionCreateReducer,
   allRequisitions: allRequisitionsReducer,
   individualRequisition: individualRequisitionReducer,
   departmentRequisitionList:departmentRequisitionListReducer,
   requisitionApproval:requisitionApproveReducer,
   reimbursementCreate: reimbursementCreateReducer,
   allReimbursements: allReimbursementsReducer,
   individualReimbursement: individualReimbursementReducer,

   pettycashCreate: pettycashCreateReducer,
   allPettyCash: allPettycashReducer,
   individualPettyCash: individualPettycashReducer,

   mpesaReducer:mpesaReducer,

   leaveCreate: leaveCreateReducer,
   leaveDelete: leaveDeleteReducer,
   leaveUpdate: leaveUpdateReducer,
   leaveDetails: leaveDetailsReducer,
   leaveList: leaveListReducer,
   leaveUserDetails:leaveUserDetailsReducer,

   agentList: agentListReducer,
  agentDetails: agentDetailsReducer,
  agentUpdate: agentUpdateReducer,
  agentDelete: agentDeleteReducer,
  agentCreate: agentCreateReducer,

  voteheadList: voteheadListReducer,
  voteheadDetails: voteheadDetailsReducer,
  voteheadCreate: voteheadCreateReducer,
  voteheadUpdate: voteheadUpdateReducer,
  voteheadDelete: voteheadDeleteReducer,

  termDatesList: termDatesListReducer,
  termDateDetails: termDateDetailsReducer,
  termDateCreate: termDateCreateReducer,
  termDateUpdate: termDateUpdateReducer,
  termDateDelete: termDateDeleteReducer,

  eventAdd: eventAddReducer,
  eventUpdate: eventUpdateReducer,
  eventDelete: eventDeleteReducer,
  
  submitexternalExamForm: submitexternalExamFormReducer,
  submitspecialExamForm: submitspecialExamFormReducer,
  submitsupplementaryExamForm: submitsupplementaryExamFormReducer,

  externalExam: externalExamFormReducer,
  externalExamList: externalExamListReducer,
  specialExam: specialExamFormReducer,
  specialExamList: specialExamListReducer,
  supplementaryExam: supplementaryExamFormReducer,
  supplementaryExamList: supplementaryExamListReducer,

  createFeedback: createFeedbackReducer,
  feedbackList: fetchAllFeedbackReducer,
  feedbackDetails: fetchFeedbackReducer,
  updateFeedback: updateFeedbackReducer,
  deleteFeedback: deleteFeedbackReducer,

    // Exam reducers
    examCreate: examCreateReducer,
    examList: getAllExamsReducer,
    examDetails: getExamDetailsReducer,
    examUpdate: examUpdateReducer,
    examDelete: examDeleteReducer

});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
