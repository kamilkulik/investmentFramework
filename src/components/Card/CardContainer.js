import React from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../../actions/cards';

const CardContainer = ({ name, id, removeCard }) => {
  return (
    <div>
      <h6>{name}</h6>
      <button onClick={() => removeCard(id)}>X</button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  removeCard: (id) => dispatch(removeCard(id))
})

export default connect(null, mapDispatchToProps)(CardContainer);