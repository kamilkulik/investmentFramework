import React, { useState } from 'react';
import NewElementButton from '../../components/newElementButton';
import CardCreator from '../../components/Card/CardCreator';

const CardCreatorContainer = ({ className, phaseId }) => {

  const [cardCreator, setCardCreator] = useState(false);

  return (
    <div className={`${className} creator`} onBlur={() => setCardCreator(false)}>
      {cardCreator ? 
        <CardCreator 
          phaseId={phaseId}
        /> :
        <NewElementButton 
        title='+ Dodaj kolejne aktywo'
        buttonAction={() => setCardCreator(true)}
        />
      }
      {cardCreator && <button className='creator--button-x' onClick={() => setCardCreator(false)}>X</button>}
    </div>
  );
}

export default CardCreatorContainer;
