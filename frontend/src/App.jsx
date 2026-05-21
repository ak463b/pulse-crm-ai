//import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Layout Wrapper Component
import MainLayout from './components/layout/MainLayout';

// 2. Core Feature Screens
import LogInteractionScreen from './features/interaction/components/LogInteractionScreen';
import HcpDirectory from './features/hcp/components/HcpDirectory';

// 3. Placeholder Screens (For remaining Sidebar links)
const AnalyticsScreen = () => (
  <div style={{ padding: '60px 24px', textAlign: 'center', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>
    <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📊</span>
    <h2 style={{ color: '#1f2937', marginBottom: '8px' }}>Analytics Dashboard</h2>
    <p>The reporting and analytics module is currently under development.</p>
  </div>
);

const NotFoundScreen = () => (
  <div style={{ padding: '60px 24px', textAlign: 'center', color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>
    <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🚧</span>
    <h2 style={{ marginBottom: '8px' }}>404 - Page Not Found</h2>
    <p style={{ color: '#6b7280' }}>The screen you are looking for does not exist in the CRM.</p>
  </div>
);

function App() {
  return (
    <Router>
      {/* MainLayout wraps the entire application, providing the Sidebar and Topbar */}
      <MainLayout>
        
        {/* Routes act as the dynamic center pane, swapping out based on the URL */}
        <Routes>
          {/* Default Route: Redirects users immediately to the Log Interaction tool */}
          <Route path="/" element={<Navigate to="/log-interaction" replace />} />
          
          {/* Main Connected Feature Modules */}
          <Route path="/log-interaction" element={<LogInteractionScreen />} />
          <Route path="/directory" element={<HcpDirectory />} />
          
          {/* Additional Sidebar Routes */}
          <Route path="/analytics" element={<AnalyticsScreen />} />
          
          {/* Catch-all route for broken or manually typed URLs */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>

      </MainLayout>
    </Router>
  );
}

export default App;