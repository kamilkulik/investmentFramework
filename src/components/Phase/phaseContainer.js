import React from 'react';
import { connect } from 'react-redux';
import { removePhase } from '../../actions/phases';
import CardCreatorContainer from '../../components/Card/CardCreatorContainer';
import CardContainer from '../../components/Card/CardContainer';

const PhaseContainer = ({ name, id, removePhase, cards }) => {

  return (
    <div>
      <h4>{name}</h4>
      <button onClick={() => removePhase(id)}>X</button>
      {cards.length > 0 ? 
        cards.map(card => (
          <div key={card.id}>
            <CardContainer 
              name={card.name}
              id={card.id}
              phaseId={card.phaseId}
            />
          </div>
        )) :
      <CardCreatorContainer
        phaseId={id}
      />
      }
      {cards.length > 0 ?
        <CardCreatorContainer
        phaseId={id}
        /> :
        '' 
      }
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  cards: state.phases.find(phase => phase.id === ownProps.id).cards
})

const mapDispatchToProps = dispatch => ({
  removePhase: (id) => dispatch(removePhase(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);