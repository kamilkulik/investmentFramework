import React from 'react';
import CardCreatorContainer from '../../components/Card/CardCreatorContainer';
import CardContainer from '../../components/Card/CardContainer';
import ColumnContainer from '../../components/Column/ColumnContainer';

const TableContainer = ({ phaseId, className, cards, columns }) => {
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
        <CardCreatorContainer
        phaseId={phaseId}
        className='phase--newRow'
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

export default TableContainer;