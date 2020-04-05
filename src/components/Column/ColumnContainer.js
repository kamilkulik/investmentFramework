import React from 'react';
import { connect } from 'react-redux';
import { removeColumn } from '../../actions/columns';

const ColumnContainer = ({ name, columnId, removeColumn }) => {
  return (
    <div>
      <h6>{name}</h6>
      <button onClick={() => removeColumn(columnId)}>X</button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  removeColumn: (columnId) => dispatch(removeColumn(columnId))
})

export default connect(null, mapDispatchToProps)(ColumnContainer);