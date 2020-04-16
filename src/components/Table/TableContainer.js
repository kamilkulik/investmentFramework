import React from 'react';
import { connect } from 'react-redux';
import ElementCreator from '../../components/ElementCreator/ElementCreator';
import CardContainer from '../../components/Card/CardContainer';
import ColumnContainer from '../../components/Column/ColumnContainer';
import { addCard } from '../../actions/cards';
import { addGenericColumnValue } from '../../actions/columns';

const TableContainer = ({ phaseId, className, cards, columns, addCard, addGenericColumnValue }) => {
  return (
    <div className={`${className} table`}>
      <div className='table--rowStart'></div>
      {<div className='table--rowName'>{
        cards.map((card, index) => (
          <div key={card.cardId} className='row--container'>
            <CardContainer 
              name={card.name}
              cardId={card.cardId}
              phaseId={card.phaseId}
              index={index}
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
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter((column) => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  addCard: (name, phaseId) => dispatch(addCard(name, phaseId)),
  addGenericColumnValue: (phaseId) => dispatch(addGenericColumnValue(phaseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);