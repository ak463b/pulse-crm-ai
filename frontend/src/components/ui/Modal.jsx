//import React from 'react';
import './Modal.css';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="crm-modal-overlay" onClick={onClose}>
      <div className="crm-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <h3 className="crm-modal-title">{title}</h3>
          <button className="crm-modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="crm-modal-body">{children}</div>
        <div className="crm-modal-footer">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;