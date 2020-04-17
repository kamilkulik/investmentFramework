import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removePhase, renamePhase } from '../../actions/phases';
import ElementCreator from '../../components/ElementCreator/ElementCreator';
import TableContainer from '../../components/Table/TableContainer';
import SmallBtn from '../../components/SmallBtn';
import { addCard } from '../../actions/cards';
import { addColumn } from '../../actions/columns';
import { addGenericColumnValue } from '../../actions/columns';

const PhaseContainer = ({ name, phaseId, removePhase, renamePhase, cards, columns, addCard, addColumn, addGenericColumnValue }) => {

  const [phaseName, setPhaseName] = useState(name)
  const nameTextArea = React.createRef();

  const changePhaseName = () => {
    if (phaseName !== name) {
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
            className='phase--table'
          />}
      {cards.length > 0 && 
        <ElementCreator
          phaseId={phaseId}
          classNames={['phase--newColumn']}
          setElementName={addColumn} 
          placeholder='Nazwa wskaźnika' 
          addText='Dodaj Wskaźnik' 
          btnText='+ Dodaj Wskaźnik' 
          columns={columns} 
          cards={cards}
        />}
      {cards.length === 0 && 
        <ElementCreator
          phaseId={phaseId}
          classNames={['phase--newRow']}
          setElementName={addCard} 
          placeholder='Nazwa aktywa' 
          addText='Dodaj Aktywo' 
          btnText='+ Dodaj Aktywo' 
          columns={columns} 
          cards={cards}
          addGenericColumnValue={addGenericColumnValue}
          type='card'
        /> }
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter(column => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  removePhase: (id) => dispatch(removePhase(id)),
  renamePhase: (name, phaseId) => dispatch(renamePhase(name, phaseId)),
  addCard: (name, phaseId) => dispatch(addCard(name, phaseId)),
  addGenericColumnValue: (phaseId) => dispatch(addGenericColumnValue(phaseId)),
  addColumn: (name, phaseId, initialValuesCount) => dispatch(addColumn(name, phaseId, initialValuesCount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);