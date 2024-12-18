import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SubmitClaim from './pages/SubmitClaim';
import ViewClaims from './pages/ViewClaims';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ClaimDetails from './pages/ClaimDetails';
import { AuthProvider } from './context/AuthContext';
import ClaimSubmitted from './pages/ClaimSubmitted';
import EditClaim from './pages/EditClaim';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/submit-claim"
                element={
                  <ProtectedRoute>
                    <SubmitClaim />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-claims"
                element={
                  <ProtectedRoute>
                    <ViewClaims />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/claim-submitted"
                element={
                  <ProtectedRoute>
                    <ClaimSubmitted />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-claims/:id"
                element={
                  <ProtectedRoute>
                    <ClaimDetails />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/edit-claim/:id"
                element={
                  <ProtectedRoute>
                    <EditClaim  />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
