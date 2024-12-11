import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SubmitClaim from './pages/SubmitClaim';
import ViewClaims from './pages/ViewClaims';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/view-claims" element={<ViewClaims />} />
            <Route path="/submit-claim" element={<SubmitClaim />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;