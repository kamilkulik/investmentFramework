import React, { useState } from 'react';
import { BsPlusSquare, BsCheckBox } from 'react-icons/bs';

const DecisionItem = ({ name }) => {

  const [icon, toggleIcon] = useState(false);

  return (
    <React.Fragment>
    <p>{name}</p>
      { 
        icon ?
        <BsCheckBox onClick={() => toggleIcon(!icon)} className='decision-gate__icon'/> : 
        <BsPlusSquare onClick={() => toggleIcon(!icon)}/>
      } 
      </React.Fragment>
  )
};

export default DecisionItem;