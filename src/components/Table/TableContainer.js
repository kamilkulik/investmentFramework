import React from 'react';
import { connect } from 'react-redux';
import ElementCreator from '../DefaultElement/ElementCreator';
import ColumnContainer from '../../components/Column/ColumnContainer';
import { addCard, removeCard, renameCard } from '../../actions/cards';
import { addGenericColumnValue } from '../../actions/columns';
import DefaultContainer from '../DefaultElement/DefaultContainer';

const TableContainer = ({ phaseId, className, cards, columns, addCard, addGenericColumnValue, removeCard, renameCard }) => {
  return (
    <div className={`${className} table`}>
      <div className='table--rowStart'></div>
      {<div className='table--rowName'>{
        cards.map((card, index) => (
          <div key={card.cardId} className='row--container'>
            <DefaultContainer
              name={card.name}
              elementId={card.cardId}
              phaseId={card.phaseId}
              index={index}
              removeElement={removeCard}
              renameElement={renameCard}
            />
          </div>
        ))
        }
        <ElementCreator
          phaseId={phaseId}
          classNames={['phase--newRow']}
          setElementName={addCard} 
          placeholder='Nazwa aktywa' 
          addText='Dodaj Aktywo' 
          btnText='+ Dodaj Kolejne Aktywo' 
          columns={columns} 
          addGenericColumnValue={addGenericColumnValue}
          type='card'
        />
        </div>
      }
      {columns.map(column => (
        <ColumnContainer 
          key={column.columnId}
          name={column.name}
          columnId={column.columnId}
          phaseId={column.phaseId}
        />
        ))
      }
      {columns.length > 0 &&
        
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter((column) => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  addCard: (name, phaseId) => dispatch(addCard(name, phaseId)),
  removeCard: (cardId, phaseId, index) => dispatch(removeCard(cardId, phaseId, index)),
  renameCard: (name, cardId) => dispatch(renameCard(name, cardId)),
  addGenericColumnValue: (phaseId) => dispatch(addGenericColumnValue(phaseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);