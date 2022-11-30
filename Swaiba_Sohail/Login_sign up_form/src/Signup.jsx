import React, { useState } from "react";
import Axios from 'axios';

export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name1, setFirstName] = useState('');
    const [name2, setLastName] = useState('');
    const [conpass, setconpass] = useState('');

     const register = () => {
        Axios.post("http://localhost:3006/register", {
            emailS: email,
            name1S: name1,
            name2S:name2,
            passS: pass,
        }).then((response) => {
            console.log(response);
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Signup _ Form</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your fisrt name</label>
            <input value={name1} onChange={(e) => setFirstName(e.target.value)}type="name1" placeholder=" ****** " id="name" name="Fisrt Name" />
            <label htmlFor="name">Enter your last name</label>
            <input value={name2} onChange={(e) => setLastName(e.target.value)}type="name2" placeholder=" ****** " id="name" name="Last Name" />
            
            <label htmlFor="email">Enter your email_ID</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="your_id@lums.edu.pk" id="email" name="email ID" />
            <label htmlFor="password">Enter your Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="Password" />
            <label htmlFor="password">Confirm your Password</label>
            <input value={conpass} onChange={(e) => setconpass(e.target.value)} type="confirmpassword" placeholder="********" id="confirmpassword" name="Confirm Password" />
            
            <button type="submit" onClick={register}>Signup</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )









}
