//import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, name, value, onChange, options = [], error }) => {
  return (
    <div className="crm-dropdown-group">
      {label && <label className="crm-dropdown-label">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`crm-dropdown-select ${error ? 'crm-dropdown-error-border' : ''}`}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="crm-dropdown-error-text">{error}</span>}
    </div>
  );
};

export default Dropdown;