import {GoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import {useDispatch} from "react-redux";
import {setLoggedIn, setToken, setUserInfo} from "../slices/userSlice";
import {useNavigate} from "react-router-dom";


export const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const [profile,setProfile] = useState();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("");


    useEffect(() => {
        // Log user state whenever it changes
        console.log('User Role updated:', userRole);
    }, [userRole]); // Include user state in the dependency array

    const fetchUserData = async (email) => {
        try {
            const response = await axios.get(`https://edunexa.onrender.com/getUserByEmail?email=${encodeURIComponent(email)}`);
            console.log(response);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 404) {
                console.log("User not found, redirecting to signup.");
                navigate('/signup');
            } else {
                console.error("An error occurred:", e);
            }
        }
    }

    function setUserData(userData) {
        // Set user data to local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        // Set additional fields to local storage
        localStorage.setItem('email', userData.email);
        localStorage.setItem('first_name', userData.first_name);
        localStorage.setItem('id', userData.id);
        localStorage.setItem('last_name', userData.last_name);
        localStorage.setItem('password', userData.password);
        localStorage.setItem('sec_answer', userData.sec_answer);
        localStorage.setItem('user_role', userData.user_role);
        setUserRole(userData.user_role);
        localStorage.setItem('username', userData.username);
    }

    const handleLoginSuccess = async (credential) => {
        const decodedToken = jwtDecode(credential.credential);
        const userData = {
            email: decodedToken.email,
            firstName: decodedToken.given_name,
            lastName: decodedToken.family_name,
            fullName: decodedToken.name
        };
        const user_data = await fetchUserData(userData.email);
        if(user_data) {
            console.log(user_data);
            setUserData(user_data); // Update user state
            // await dispatch(setUserInfo(user_data));
            // await dispatch(setLoggedIn(true));
            if (userRole === "Student") {
                navigate("/dashboard");
            }
            else if (userRole === "Instructor"){
                navigate("/dashboardInstructor");
            }
            else if (userRole === "Admin"){
                navigate("/dashboardAdmin");
            }
        }
    };
    return (
        <GoogleLogin
            onSuccess={(async( credential) =>
            {await handleLoginSuccess(credential)})}
            onError={() => {
                console.log('Google Login Failed')
            }}
        />
    )
}