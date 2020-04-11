import { v4 as uuidv4 } from 'uuid';

// ADD_PHASE_NAME

export const setPhaseName = (name = '') => ({
  type: 'ADD_PHASE',
  name,
  phaseId: uuidv4()
});

// REMOVE_PHASE_NAME

export const removePhase = ( phaseId ) => ({
  type: 'REMOVE_PHASE',
  phaseId
})

// RENAME_PHASE

export const renamePhase = (name, phaseId) => ({
  type: 'RENAME_PHASE',
  name,
  phaseId
})