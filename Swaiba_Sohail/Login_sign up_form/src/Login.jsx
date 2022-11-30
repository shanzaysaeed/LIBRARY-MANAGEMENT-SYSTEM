import React, { useState } from "react";
import Axios from 'axios';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginStatus, setloginStatus] = useState('');

    const login = () => {
        Axios.post("http://localhost:3006/login", {
            emailS: email,
            passS: pass,
        }).then((response) => {

            if(response.data.message)
            {
                setloginStatus(response.data.message);
            }
            else{
                setloginStatus(response.data[0].email);
            }
            console.log(response);
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Login _ Form</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your Email ID</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail_ID@lums.edu.pk" id="email" name="email" />
                <label htmlFor="password">Enter your Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="Enter your Password" />
                <button type="submit" onClick={login}>Log In</button>
            </form>
            <h1>{loginStatus}</h1>
            <button className="link-btn" onClick={() => props.onFormSwitch('Signup')}>Don't have an account? Signup here.</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('Forgottenpassword')}>Forgotton Password?</button>
        </div>

    )
} 
