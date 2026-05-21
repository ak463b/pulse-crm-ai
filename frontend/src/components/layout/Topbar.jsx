//import React from 'react';

const Topbar = () => {
  return (
    <header style={{ height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>Jane Rep</span>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
          JR
        </div>
      </div>
    </header>
  );
};

export default Topbar;