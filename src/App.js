import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import './App.css';
import LoginPage from './pages/LoginPage';
import RadiusConfigs from './pages/RadiusConfigs';
import NotificationPreference from './pages/NotificationPreference';
import PointsConfigs from './pages/PointsConfigs';
import ManageProductCategories from './pages/ManageProductCategories';
import UserManagement from './pages/UserManagement';
import DetailsInformationUser from './pages/DetailsInformation';
import api from './api/posts';

function App() {
  // Assume isLoggedIn is a state variable that determines if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform any additional logout logic (e.g., clearing user data, redirecting, etc.)
    setIsLoggedIn(false);
  };

  // useEffect (() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/post');

  //     } catch (error) {
        
  //     }
  //   }
  // }, [])

  return (
    <Router>
      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <div className='dashboard-container'>
          <SideBar menu={sidebar_menu} onLogout={handleLogout} />

          <div className='dashboard-body'>
            <Routes>
              <Route exact path="/radiusConfigs" element={<RadiusConfigs />} />
              <Route exact path="/notificationPreference" element={<NotificationPreference />} />
              <Route exact path="/pointsConfigs" element={<PointsConfigs />} />
              <Route exact path="/manageProductCategories" element={<ManageProductCategories />} />
              <Route exact path="/userManagement" element={<UserManagement />} />
              <Route exact path="/detailsInfoUser" element={<DetailsInformationUser />} />
            </Routes>
          </div>
        </div>
      ) : (
        // Render LoginPage if not logged in
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </Router>
  );
}

export default App;
