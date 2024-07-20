import React from 'react';
import Navbar from '../partials/Navbar';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <Navbar/>
            <h1>Welcome to the Mental Health Support Platform</h1>
            <p>Find the support you need for your mental well-being.</p>
          <p>Connect with a mental health professional and engage in ongoing conversations to help you navigate your feelings.</p>
          <NavLink to="/textresource">Go to Text Resource</NavLink>
        </div>
    );
}

export default HomePage;