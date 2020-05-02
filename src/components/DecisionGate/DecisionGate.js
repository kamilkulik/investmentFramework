import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import TableContext from '../Table/Table-context';
import ColumnItemBox from '../Column/ColumnItemBox';
import DecisionItem from './DecisionItem';
import NewElementButton from '../newElementButton';
import { nextPhase, addToPositionSizing } from '../../actions/selected';

const DecisionGate = ({ handleFireAction, phases, phaseId, classNames, nextPhase, addToPositionSizing }) => {

  const { rows } = useContext(TableContext);
  const [actionType, setActionType] = useState('');
  const [selectedRowsState, setSelectedRows] = useState([]);

  const handleRowSelect = (selected, rowId) => {
    selected ? 
    setSelectedRows([...selectedRowsState, rows.find(row => row.rowId === rowId)]) :
    setSelectedRows(selectedRowsState.filter(row => row.rowId !== rowId))
  }

  const nextPhaseName = () => {
    const phaseIds = phases.map(phase => phase.phaseId)
    const curPhaseIndex = phaseIds.indexOf(phaseId);
    const nPhaseName = `Phase${curPhaseIndex + 2}`
    return nPhaseName
  }

  const proceed = () => {
    handleFireAction();
    switch (actionType) {
      case 'compare': 
        selectedRowsState.length > 0 && nextPhase(nextPhaseName(), selectedRowsState)
        break;
      case 'proceed':
        selectedRowsState.length > 0 && addToPositionSizing(selectedRowsState)
        break;
      case 'add':
        break;
      default:
        console.log('run with error')
    }
  }

  return (
    <ColumnItemBox classNames={classNames}>
      <div className='decision-gate'>
        <p>Select assets for next steps:</p>
          {rows.map(row => (
            <div key={row.rowId} className='decision-gate__item'>
              <DecisionItem 
                row={row}
                handleRowSelect={handleRowSelect}
              />
            </div>
          ))}
        <p>How do you want to proceed?</p>
        <select id='nextAction' onChange={(e) => setActionType(e.target.value)}>
          <option value=''>Select action</option>
          <option value='compare'>Compare in next phase</option>
          <option value='proceed'>Proceed to risk planning</option>
          <option value='add'>Add to risk planning</option>
        </select>
        {selectedRowsState.length > 0 && actionType &&
          <NewElementButton 
          title={'Submit'}
          buttonAction={proceed}
        />}
      </div>  
    </ColumnItemBox>
  )
};

const mapStateToProps = (state) => {
  return ({
    phases: state.phases
  })
}

const mapDispatchToProps = dispatch => ({
  nextPhase: (name, rows) => dispatch(nextPhase(name, rows)),
  addToPositionSizing: (rows) => dispatch(addToPositionSizing(rows))
})

export default connect(mapStateToProps, mapDispatchToProps)(DecisionGate);