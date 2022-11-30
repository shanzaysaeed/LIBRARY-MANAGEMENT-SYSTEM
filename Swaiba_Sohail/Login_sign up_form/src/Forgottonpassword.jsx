import React, { useState } from "react";
export const Forgottonpassword = (props) => {
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>ResetPassword _ Form</h2>
            <form className="PasswordReset_form" onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your Email ID</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail_ID@lums.edu.pk" id="email" name="email" />
                <button type="submit">Reset Password</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Login here.</button>
   
            <button className="link-btn" onClick={() => props.onFormSwitch('Signup')}>Don't have an account? Signup here.</button>
        </div>
    )
     
    

}

