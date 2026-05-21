//import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check which tab is currently active based on the URL
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-branding">PulseCRM</div>
      
      <ul className="sidebar-nav-list">
        {/* Route 1: Log Interaction */}
        <li 
          className={`sidebar-nav-item ${isActive('/log-interaction')}`} 
          onClick={() => navigate('/log-interaction')}
        >
          <span>📝</span> Log Interaction
        </li>
        
        {/* Route 2: HCP Directory */}
        <li 
          className={`sidebar-nav-item ${isActive('/directory')}`} 
          onClick={() => navigate('/directory')}
        >
          <span>👨‍⚕️</span> HCP Directory
        </li>
        
        {/* Route 3: Analytics */}
        <li 
          className={`sidebar-nav-item ${isActive('/analytics')}`} 
          onClick={() => navigate('/analytics')}
        >
          <span>📊</span> Analytics
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;