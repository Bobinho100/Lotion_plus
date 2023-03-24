import React from 'react'
import {  useGoogleLogin } from '@react-oauth/google';
//import axios from 'axios';


const Login = ({user, setUser, profile, setProfile, email, setEmail}) => {


 

    /*const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);*/

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            localStorage.setItem("user", JSON.stringify(codeResponse))
        
        
        },
        onError: (error) => console.log('Login Failed:', error),
        
    });

    
    // log out function to log the user out of google and set the profile array to null




    /*const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };*/


  return (
    <>
        <div>
            <h2>React Google Login</h2>
           
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            
        </div>
    

        
    
    
    </>
  )
}

export default Login