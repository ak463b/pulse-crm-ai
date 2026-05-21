//import React from 'react';
import './InputField.css';

const InputField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  ...props 
}) => {
  return (
    <div className="crm-input-group">
      {label && <label className="crm-input-label">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`crm-input-field ${error ? 'crm-input-error-border' : ''}`}
        {...props}
      />
      {error && <span className="crm-input-error-text">{error}</span>}
    </div>
  );
};

export default InputField;