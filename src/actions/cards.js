import { v4 as uuidv4 } from 'uuid';

// ADD_CARD

export const addCard = (name = '', phaseId = '') => ({
  type: 'ADD_CARD',
  name,
  cardId: uuidv4(),
  phaseId
});

// REMOVE_CARD

export const removeCard = ( cardId, phaseId, index ) => ({
  type: 'REMOVE_CARD',
  cardId,
  phaseId,
  index
})

// RENAME_CARD

export const renameCard = (name, cardId) => ({
  type: 'RENAME_CARD',
  name,
  cardId
})