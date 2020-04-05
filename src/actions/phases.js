import { v4 as uuidv4 } from 'uuid';

// ADD_PHASE_NAME

export const setPhaseName = (name = '') => ({
  type: 'ADD_PHASE',
  name,
  id: uuidv4()
});

// REMOVE_PHASE_NAME

export const removePhase = ( id ) => ({
  type: 'REMOVE_PHASE',
  id
})