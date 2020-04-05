import { v4 as uuidv4 } from 'uuid';

// ADD_CARD

export const addCard = (name = '', phaseId = '') => ({
  type: 'ADD_CARD',
  name,
  id: uuidv4(),
  phaseId
});

// REMOVE_CARD

export const removeCard = ( id ) => ({
  type: 'REMOVE_CARD',
  id
})