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
import DashboardHomeAdmin from './pages/assets/HomeAdmin'; // Adjust the path as per your project structure
import DashboardHomeInstructor from './pages/assets/HomeInstructor'; // Adjust the path as per your project structure
import AdminCourseApproval from './pages/AdminCourseApproval/CourseApproval';
import CourseForm from './pages/InstructorAddCourse/InstructorAddCourse';
import CourseFormDemo from './pages/InstructorAddCourse/InstructorAddCourseDemo';
import Assignment from './pages/Assignments/assignments';

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
          <Route path='/dashboardInstructor/courseform/' element={<CourseForm />} /> {/* For adding a new course */}
          <Route path='/courseform/:courseId' element={<CourseForm />} /> {/* For updating an existing course */}
          <Route path='dashboardAdmin/courseapproval' element={<AdminCourseApproval />} />

          <Route path={'/dashboard/*'} element={<Dashboard>
            <Routes>
              <Route index element={<DashboardHome/>}></Route>
            </Routes>
              </Dashboard>
          } />

          <Route path='dashboardAdmin/*' element={<DashboardAdmin />}>
            <Route path='dashboardAdmin/courseapproval' element={<AdminCourseApproval />} />
            <Route index element={<DashboardHomeAdmin />} />
          </Route>

          <Route path='dashboardInstructor/*' element={<DashboardInstructor />}>
            <Route index element={<DashboardHomeInstructor />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;





