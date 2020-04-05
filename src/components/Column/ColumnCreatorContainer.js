import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import ColumnCreator from '../../components/Column/ColumnCreator';

const ColumnCreatorContainer = ({ phaseId }) => {

  const [columnCreator, setColumnCreator] = useState(false);

  return (
    <div>
      {columnCreator ? 
        <ColumnCreator 
          phaseId={phaseId}
        /> :
        <NewElementButton 
        title='Dodaj kolejny wskaźnik'
        buttonAction={() => setColumnCreator(true)}
        />
      }
      {columnCreator && <button onClick={() => setColumnCreator(false)}>X</button>}
    </div>
  );
}

export default ColumnCreatorContainer;
