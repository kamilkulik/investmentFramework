import React from 'react';
import { connect } from 'react-redux';
import { removePhase, renamePhase } from '../../actions/phases';
import ElementCreator from '../DefaultElement/ElementCreator';
import TableContainer from '../../components/Table/TableContainer';
import { addCard } from '../../actions/cards';
import { addColumn, addGenericColumnValue } from '../../actions/columns';
import DefaultContainer from '../DefaultElement/DefaultContainer';

const PhaseContainer = ({ name, phaseId, removePhase, renamePhase, cards, columns, addCard, addColumn, addGenericColumnValue }) => {

  return (
    <div className='phase'>
      <DefaultContainer
        classNames={['phase--header']}
        name={name}
        elementId={phaseId}
        phaseId={phaseId}
        removeElement={removePhase}
        renameElement={renamePhase}
      />
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