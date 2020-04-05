import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import CardCreator from '../../components/Card/CardCreator';

const CardCreatorContainer = ({ phaseId }) => {

  const [cardCreator, setCardCreator] = useState(false);

  return (
    <div>
      {cardCreator ? 
        <CardCreator 
          phaseId={phaseId}
        /> :
        <NewElementButton 
        title='Dodaj kolejne aktywo'
        buttonAction={() => setCardCreator(true)}
        />
      }
      {cardCreator && <button onClick={() => setCardCreator(false)}>X</button>}
    </div>
  );
}

export default CardCreatorContainer;
