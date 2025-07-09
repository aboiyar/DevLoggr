import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import PostPage from './components/pages/PostPage';
import PrivateRoute from './components/layout/PrivateRoute';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route 
                path="/posts/new" 
                element={
                  <PrivateRoute>
                    <PostFormPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/posts/:id/edit" 
                element={
                  <PrivateRoute>
                    <PostFormPage isEdit={true} />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
