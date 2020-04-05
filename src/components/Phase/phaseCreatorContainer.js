import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import PhaseCreator from '../../components/Phase/phaseCreator';

const PhaseCreatorContainer = () => {

  const [phaseCreator, setPhaseCreator] = useState(false);

  return (
    <div>
      {phaseCreator ? 
        <PhaseCreator /> :
        <NewElementButton 
        title='Dodaj kolejną fazę'
        buttonAction={() => setPhaseCreator(true)}
      />
      }
      {phaseCreator && <button onClick={() => setPhaseCreator(false)}>X</button>}
    </div>
  );
}

export default PhaseCreatorContainer;
