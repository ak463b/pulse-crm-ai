//import React from 'react';

const HcpProfileCard = ({ hcp, onSelect }) => {
  const badgeColor = hcp.status === 'Target' ? '#eff6ff' : '#f3f4f6';
  const badgeTextColor = hcp.status === 'Target' ? '#2563eb' : '#4b5563';

  return (
    <div 
      onClick={() => onSelect(hcp)}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'between'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#3b82f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>{hcp.name}</h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#2563eb' }}>{hcp.specialty}</p>
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          padding: '2px 8px',
          borderRadius: '12px',
          backgroundColor: badgeColor,
          color: badgeTextColor
        }}>
          {hcp.status}
        </span>
      </div>

      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px', marginTop: '10px', fontSize: '12px', color: '#6b7280' }}>
        <p style={{ margin: '0 0 4px 0' }}>🏥 <strong>Institution:</strong> {hcp.hospital}</p>
        <p style={{ margin: '0' }}>📅 <strong>Last Interaction:</strong> {hcp.lastSeen}</p>
      </div>
    </div>
  );
};

export default HcpProfileCard;