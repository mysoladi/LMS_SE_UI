import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from './pages/signup/SignupPage';
import Login from './pages/login/Login';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './pages/HomePage/HomePage';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Dashboard from './pages/Dashboard/dashboard';
import DashboardHome from './pages/assets/Home'

import Assignment from './pages/Assignments/assignments';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path='/signup' element={<SignupPage/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path = "/resetpassword" element = {<ChangePassword />} />
          <Route path={'/dashboard/*'} element={<Dashboard>
            <Routes>
              <Route index element={<DashboardHome/>}></Route>
            </Routes>
              </Dashboard>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
