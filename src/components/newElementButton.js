import React from 'react';

const newElementButton = ({ title, buttonAction }) => {
  return (
    <div>
      <button 
        onClick={() => buttonAction()}
        >
        {title}
        </button>
    </div>
  );
}

export default newElementButton;