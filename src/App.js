import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from './pages/signup/SignupPage';
import Login from './pages/login/Login';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import HomePage from './pages/HomePage/HomePage';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Dashboard from './pages/Dashboard/dashboard';
import DashboardAdmin from './pages/Dashboard/dashboardAdmin';
import DashboardInstructor from './pages/Dashboard/dashboardInstructor';
import DashboardHome from './pages/assets/Home';
import DashboardHomeAdmin from './pages/assets/HomeAdmin';
import DashboardHomeInstructor from './pages/assets/HomeInstructor';
import AdminCourseApproval from './pages/AdminCourseApproval/CourseApproval';
import CourseApprovalRejected from './pages/AdminCourseApproval/CourseApprovalRejected';
import CourseApprovalApproved from './pages/AdminCourseApproval/CourseApprovalApprove';
import CourseForm from './pages/InstructorAddCourse/InstructorAddCourse';
import CourseFormDemo from './pages/InstructorAddCourse/InstructorAddCourseDemo';
import Assignment from './pages/Assignments/assignments';
import CoursesPage from "./pages/AdminCourseApproval/CourseApproval";
import AdminDashboard from "./pages/Dashboard/AdminDash";
import Confirmation from "./pages/InstructorAddCourse/InstructorAddCourseConfirm";
import AddAnnouncement from "./pages/InstructorAddCourse/AddAnnouncement";
import AddAssignment from "./pages/InstructorAddCourse/AddAssignment";
import AssignmentSubmission from './pages/Assignmentsubmission/assignmentsubmit'; // Importing AssignmentSubmission
import Assignmentgrading from './pages/Assignmentgrading/filelist';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ChangePassword />} />

          <Route path="/courseformdemo" element={<CourseFormDemo />} />
          <Route path='/dashboardInstructor/courseform/' element={<CourseForm />} />
          <Route path='/courseform/:courseId' element={<CourseForm />} />
          <Route path='dashboardAdmin/courseapproval' element={<AdminCourseApproval />} />
          <Route path='dashboardAdmin/courseapprovalapprove' element={<CourseApprovalApproved />} />
          <Route path='dashboardAdmin/courseapprovalreject' element={<CourseApprovalRejected />} />

          <Route path='dashboard/mycourses/AssignmentSubmission/assignment-submit' element={<AssignmentSubmission />} />  // New route for AssignmentSubmission
          <Route path='dashboardInstructor/assignment/filelist' element={<Assignmentgrading/>} /> {/* File List component */}
          
          <Route path={'/dashboard/*'} element={<Dashboard>
            <Routes>
              <Route index element={<DashboardHome />}></Route>
            </Routes>
          </Dashboard>
          } />

          <Route path='dashboardAdmin/*' element={<DashboardAdmin>
            <Routes>
              <Route index element={<AdminDashboard/>}></Route>
              <Route path={'/adminpanel'} element = {<CoursesPage/>}></Route>
            </Routes>
          </DashboardAdmin>
          } />

          <Route path='dashboardInstructor/*' element={<DashboardInstructor>
            <Routes>
              <Route index element={<DashboardHomeInstructor />} />
              <Route path={'/add-announcement'} element={<AddAnnouncement/>}></Route>
              <Route path={'/add-assignment'} element={<AddAssignment/>}></Route>
              <Route path={'/confirmation'} element={<Confirmation/>}></Route>
            </Routes>
          </DashboardInstructor>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
