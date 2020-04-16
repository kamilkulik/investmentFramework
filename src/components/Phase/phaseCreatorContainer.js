import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import PhaseCreator from '../../components/Phase/phaseCreator';

const PhaseCreatorContainer = () => {

  const [phaseCreator, setPhaseCreator] = useState(false);

  return (
    <div className='main--phase-creator creator' onBlur={() => setPhaseCreator(false)}>
      {phaseCreator ? 
        <PhaseCreator /> :
        <NewElementButton 
        title='+ Dodaj kolejną fazę'
        buttonAction={() => setPhaseCreator(true)}
      />
      }
      {phaseCreator && <button className='creator--button-x' onClick={() => setPhaseCreator(false)}>X</button>}
    </div>
  );
}

export default PhaseCreatorContainer;
