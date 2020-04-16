import React from 'react';

const SmallBtn = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className='smallBtn'
      >{children}</button>
  )
}

export default SmallBtn;

// <button onClick={() => removePhase(phaseId)}>X</button>