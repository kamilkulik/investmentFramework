import React from 'react';
import { connect } from 'react-redux'
import PhaseCreatorContainer from './components/Phase/phaseCreatorContainer';
import PhaseContainer from './components/Phase/phaseContainer';

const App = ({ phases }) => {

  return (
    <div>
      {phases ? 
        phases.map(phase => (
          <div key={phase.id}>
            <PhaseContainer 
              name={phase.name}
              id={phase.id}
            />
          </div>
        )) :
        ''
      }
      <PhaseCreatorContainer/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  phases: state.phases
})

export default connect(mapStateToProps)(App);
