import React from 'react';

const newElementButton = ({ title, buttonAction }) => {
  return (
    <div className='creator--button-title'>
      <button 
        onClick={() => buttonAction()}
        >
        {title}
        </button>
    </div>
  );
}

export default newElementButton;