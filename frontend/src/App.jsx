import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Components/authentication/SignIn';
import Register from './Components/authentication/Register';
import HomePage from './Components/Home/HomePage';
import Textresource from './Components/Resources/Textresource';
import VideoResource from './Components/Resources/VideoResource';


function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/textResource" element={<Textresource />} />
        <Route path="/videoResource" element={<VideoResource />} />
       </Routes>
    </div>
  );
}   

export default App;
