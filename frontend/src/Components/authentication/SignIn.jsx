import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';

const SignIn = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/login', { Email, Password })
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                navigate('/'); // navigate to '/'
            })
            .catch(error => {  
                setError("Please fill the credentials");
                console.log(error);
            });
    };

    return (
        <div className="head">
        <div className="image">
            <img src="https://media.istockphoto.com/id/1226943008/photo/two-factor-authentication-and-face-identification.jpg?s=1024x1024&w=is&k=20&c=LWi-B6Ylvdcn650XzJXxREBE4E6uge_hB5lEeC5DesI=" alt="" />
        </div>
        <div className="signin-container">
            <h2 className="signin-heading">Login</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <br />
                    <input className="form-input" type="email" name='Email' value={Email} placeholder='email' onChange={handleEmailChange} required />
                </div>
                <div className="form-group">
                   <label className="form-label">Password:</label>
                   <br />
                    <input className="form-input" type="password" name='Password' value={Password} placeholder='password' onChange={handlePasswordChange} required />
                </div>
                <button className="signin-button" type="submit">Sign In</button>
                <p className="signin-message">You don't have an account? Please <NavLink className="signin-link" to={'/register'}>Register</NavLink></p>
                {error && <p className="signin-error">{error}</p>}
            </form>
        </div>
        </div>
    );
};

export default SignIn;
