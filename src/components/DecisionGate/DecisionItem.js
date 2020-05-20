import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsPlusSquare, BsCheckBox } from 'react-icons/bs';

const DecisionItem = ({ row, handleRowSelect }) => {

  const selected = !!useSelector(state => state.selected.find(el => el.rowId === row.rowId));
  const [icon, toggleIcon] = useState(selected);
  
  const handleClick = () => {
    if (!selected) {
      toggleIcon(!icon)
      handleRowSelect(!icon, row.rowId);
    }  
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