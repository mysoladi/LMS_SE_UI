
import "./HomePage.css";
import AppHeader from "../../components/AppHeader";
import { useSelector} from 'react-redux'
import Login from "../login/Login";
import DashboardHome from "../assets/Home";
import {useNavigate} from "react-router-dom";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  // console.log(isLoggedIn)
    const navigate = useNavigate();

  const displayDashboard = () => {
      navigate('/dashboard');
  }
  return (
    <div>
      <AppHeader />
      <div className="page-container">
        {!isLoggedIn && <Login />}
          {/*{isLoggedIn && displayDashboard}*/}
      </div>
    </div>
  );
}

export default HomePage;
