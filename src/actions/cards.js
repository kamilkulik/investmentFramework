import { v4 as uuidv4 } from 'uuid';

// ADD_CARD

export const addCard = (name = '', phaseId = '') => ({
  type: 'ADD_CARD',
  name,
  cardId: uuidv4(),
  phaseId
});

// REMOVE_CARD

export const removeCard = ( cardId ) => ({
  type: 'REMOVE_CARD',
  cardId
})