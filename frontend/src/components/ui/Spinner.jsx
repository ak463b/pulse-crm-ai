//import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'md' }) => {
  return (
    <div className="crm-spinner-container">
      <div className={`crm-spinner crm-spinner-${size}`}></div>
    </div>
  );
};

export default Spinner;