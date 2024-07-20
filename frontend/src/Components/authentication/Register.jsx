import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Age, setAge] = useState('');
    const [Password, setPassword] = useState('');
    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Make axios request here
            const response = await axios.post('http://localhost:8080/register', { Name, Email, Age,Password});

            console.log('Registration successful');
            // Handle success response
            // Navigate to the login page
            history('/login');
        } catch (error) {
            console.log('Registration failed');
            // Handle error response
        }
    };

    return (
        <div className="body-container">
        <div className='image'>
            <img src="https://plus.unsplash.com/premium_vector-1682303068714-4fc4d5ffa4cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlZ2lzdHJhdGlvbiUyMGZvcm18ZW58MHx8MHx8fDA%3D" alt="" />
        </div>
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <input
                type="text"
                placeholder="Name"
                name='Name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
            />
            <input
                type="email"
                placeholder="Email"
                name='Email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
            />
            <input
                type="number"
                placeholder="Age"
                name="Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
                className="input-field"
            />
             <input
                type="password"
                placeholder="Password"
                name="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
            />
            <button className="register-button" onClick={handleRegister}>Register</button>
            <p className="register-login-text">Already registered? Please <NavLink to={'/login'}>login</NavLink></p>
        </div>
        </div>

    );
};

export default Register;
