import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setPhaseName } from '../../actions/phases';

const PhaseCreator = ({ setPhaseName }) => {
  const [phaseName, setPhaseNameState] = useState('');
  
  const setPhase = (e) => {
    e.preventDefault();
    setPhaseName(phaseName);
    setPhaseNameState('');
  }

  return (
    <div>
      <form onSubmit={setPhase}>
        <input 
          placeholder='Wprowadź tytuł fazy'
          value={phaseName}
          onChange={(e) => setPhaseNameState(e.target.value)}
          />
        <button>Dodaj Fazę</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setPhaseName: (name) => dispatch(setPhaseName(name)),
})

export default connect(null, mapDispatchToProps)(PhaseCreator);