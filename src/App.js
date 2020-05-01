import React from 'react';
import { connect } from 'react-redux'
import PhaseContainer from './components/Phase/phaseContainer';
import ElementCreator from './components/DefaultElement/ElementCreator';
import DashboardContainer from './components/PositionsDashboard/DashboardContainer';
import { setPhaseName } from './actions/phases';

const App = ({ phases, selected, setPhaseName }) => {

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
        placeholder='Add phase'
        addText='Add Phase'
        btnText='+ Add next phase'
        type='phase'
      />
      {selected && 
        <DashboardContainer
          classNames={['main--positionSizing']}
        />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  phases: state.phases,
  selected: state.selected
});

const mapDispatchToProps = (dispatch) => ({
  setPhaseName: (name) => dispatch(setPhaseName(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
