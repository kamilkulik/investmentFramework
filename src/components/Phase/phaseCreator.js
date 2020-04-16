import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setPhaseName } from '../../actions/phases';

const PhaseCreator = ({ setPhaseName }) => {
  const [phaseName, setPhaseNameState] = useState('');
  const phaseNameRef = React.createRef();
  
  const setPhase = () => {
    setPhaseName(phaseName);
    setPhaseNameState('');
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      phaseNameRef.current.blur();
    }
  }

  return (
    <div>
      <input 
        placeholder='Wprowadź tytuł fazy'
        ref={phaseNameRef}
        value={phaseName}
        onChange={(e) => setPhaseNameState(e.target.value)}
        // onKeyDown={onKeyPress}
        // onBlur={setPhase}
        />
      <button 
        className='creator--button'
        onClick={setPhase}
        >Dodaj Fazę</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setPhaseName: (name) => dispatch(setPhaseName(name)),
})

export default connect(null, mapDispatchToProps)(PhaseCreator);