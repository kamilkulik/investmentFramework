import React from 'react';
import { connect } from 'react-redux';
import { removePhase } from '../../actions/phases';
import CardCreatorContainer from '../../components/Card/CardCreatorContainer';
import CardContainer from '../../components/Card/CardContainer';
import ColumnCreatorContainer from '../../components/Column/ColumnCreatorContainer';
import ColumnContainer from '../../components/Column/ColumnContainer';

const PhaseContainer = ({ name, phaseId, removePhase, cards, columns }) => {

  return (
    <div>
      <h4>{name}</h4>
      <button onClick={() => removePhase(phaseId)}>X</button>
      {cards.length > 0 ? 
        <div>
          <div>{
            cards.map(card => (
              <div key={card.cardId}>
                <CardContainer 
                  name={card.name}
                  cardId={card.cardId}
                  phaseId={card.phaseId}
                />
              </div>
            ))
          }</div>
          <div>
            <div>{
              columns.map(column => (
                <div key={column.columnId}>
                  <ColumnContainer 
                    name={column.name}
                    columnId={column.columnId}
                    phaseId={column.phaseId}
                  />
                </div>
              ))
            }</div>
            <ColumnCreatorContainer 
              phaseId={phaseId}
            />
          </div>
        </div>
        :
      <CardCreatorContainer
        phaseId={phaseId}
      />
      }
      {cards.length > 0 ?
        <CardCreatorContainer
          phaseId={phaseId}
        /> :
        '' 
      }
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter((column) => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  removePhase: (id) => dispatch(removePhase(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);