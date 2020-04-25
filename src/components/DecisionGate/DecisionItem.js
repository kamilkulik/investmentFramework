import React, { useState } from 'react';
import { BsPlusSquare, BsCheckBox } from 'react-icons/bs';

const DecisionItem = ({ row, handleRowSelect }) => {

  const [icon, toggleIcon] = useState(false);
  
  const handleClick = () => {
    toggleIcon(!icon)
    handleRowSelect(!icon, row.rowId);
  }

  return (
    <React.Fragment>
    <p>{row.name}</p>
      { 
        icon ?
        <BsCheckBox onClick={() => handleClick()} className='decision-gate__icon'/> : 
        <BsPlusSquare onClick={() => handleClick()}/>
      } 
      </React.Fragment>
  )
};

export default DecisionItem;