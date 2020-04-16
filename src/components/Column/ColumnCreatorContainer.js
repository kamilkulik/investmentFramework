import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import ColumnCreator from '../../components/Column/ColumnCreator';

const ColumnCreatorContainer = ({ className, phaseId }) => {

  const [columnCreator, setColumnCreator] = useState(false);

  return (
    <div className={`${className} creator`} onBlur={() => setColumnCreator(false)}>
      {columnCreator ? 
        <ColumnCreator 
          phaseId={phaseId}
        /> :
        <NewElementButton 
        title='+ Dodaj kolejny wskaźnik'
        buttonAction={() => setColumnCreator(true)}
        />
      }
      {columnCreator && <button className='creator--button-x' onClick={() => setColumnCreator(false)}>X</button>}
    </div>
  );
}

export default ColumnCreatorContainer;
