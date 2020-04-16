import React from 'react';
import { connect } from 'react-redux'
import PhaseContainer from './components/Phase/phaseContainer';
import ElementCreator from './components/ElementCreator/ElementCreator';
import { setPhaseName } from './actions/phases';

const App = ({ phases, setPhaseName }) => {

  return (
    <div className='main-layout'>
      {phases && 
        phases.map(phase => (
          <div key={phase.phaseId} className='main--phase'>
            <PhaseContainer 
              name={phase.name}
              phaseId={phase.phaseId}
            />
          </div>
        ))
      }
      <ElementCreator
        classNames={['main--phase-creator']}
        setElementName={setPhaseName}
        placeholder='Dodaj krok'
        addText='Dodaj fazę'
        btnText='+ Dodaj kolejną fazę'
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  phases: state.phases
});

const mapDispatchToProps = (dispatch) => ({
  setPhaseName: (name) => dispatch(setPhaseName(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
