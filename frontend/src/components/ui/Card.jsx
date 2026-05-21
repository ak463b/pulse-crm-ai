//import React from 'react';
import './Card.css';

const Card = ({ children, title, style = {} }) => {
  return (
    <div className="crm-card" style={style}>
      {title && <h3 className="crm-card-title">{title}</h3>}
      <div className="crm-card-body">{children}</div>
    </div>
  );
};

export default Card;