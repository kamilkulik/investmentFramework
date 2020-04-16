import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removePhase, renamePhase } from '../../actions/phases';
import CardCreatorContainer from '../../components/Card/CardCreatorContainer';
import ColumnCreatorContainer from '../../components/Column/ColumnCreatorContainer';
import TableContainer from '../../components/Table/TableContainer';
import SmallBtn from '../../components/SmallBtn';

const PhaseContainer = ({ name, phaseId, removePhase, renamePhase, cards, columns }) => {

  const [phaseName, setPhaseName] = useState(name)
  const nameTextArea = React.createRef();

  const changePhaseName = (e) => {
    if (phaseName !== name) {
      e.preventDefault()
      renamePhase(phaseName, phaseId)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      nameTextArea.current.blur();
    }
  }

  return (
    <div className='phase'>
      <div className='phase--header'>
        <textarea rows='1' cols='20' type='text' style={{ resize: 'none', ':hover': {cursor : 'pointer'}, border: 'none' }} 
        onClick={(e) => e.target.select()}
        value={phaseName}
        onChange={(e) => setPhaseName(e.target.value)}
        ref={nameTextArea}
        onBlur={changePhaseName}
        onKeyDown={onKeyPress}
        /> 
        <SmallBtn onClick={() => removePhase(phaseId)}>X</SmallBtn>
      </div>
      {cards.length > 0 && 
          <TableContainer 
            phaseId={phaseId}
            cards={cards}
            columns={columns}
            className='phase--table'
          />}
      {cards.length > 0 && 
        <ColumnCreatorContainer 
          phaseId={phaseId}
          className='phase--newColumn'
        />}
      {cards.length === 0 && <CardCreatorContainer
        phaseId={phaseId}
        className='phase--newRow'
        /> }
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter((column) => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  removePhase: (id) => dispatch(removePhase(id)),
  renamePhase: (name, phaseId) => dispatch(renamePhase(name, phaseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);