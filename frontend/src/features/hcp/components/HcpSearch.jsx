//import React from 'react';

const HcpSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 Search HCP by name, specialty, or hospital location..."
        style={{
          width: '100%',
          padding: '12px 16px',
          paddingLeft: '40px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          outline: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
      />
      <span style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
        fontSize: '16px',
        pointerEvents: 'none'
      }}>
      </span>
    </div>
  );
};

export default HcpSearch;