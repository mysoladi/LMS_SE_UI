import {GoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import {useDispatch} from "react-redux";
import {setLoggedIn, setToken, setUserInfo} from "../slices/userSlice";
import {useNavigate} from "react-router-dom";


export const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const [user,setUser] = useState({id:'',email:'',password:'',first_name:'',last_name:'',sec_answer:'',user_role:'',username:''});
    const [profile,setProfile] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        // Log user state whenever it changes
        console.log('User state updated:', user);
    }, [user]); // Include user state in the dependency array

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
            setUser(user_data); // Update user state
            await dispatch(setUserInfo(user_data));
            await dispatch(setLoggedIn(true));
            navigate('/dashboard');
        }
    };
    return (
        <GoogleLogin
            onSuccess={(async( credential) =>
            {handleLoginSuccess(credential)})}
            onError={() => {
                console.log('Google Login Failed')
            }}
        />
    )
}