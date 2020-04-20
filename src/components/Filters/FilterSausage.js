import React, { useState } from 'react';
import NewElementButton from '../newElementButton';
import SmallBtn from '../SmallBtn';
import { connect } from 'react-redux';
import { removeFilter } from '../../actions/filters';

const FilterSausage = ({ filter, removeFilter }) => {

  const [filterEditor, setFilterEditor] = useState(false)

  return (
    <React.Fragment>
      <NewElementButton
        title={`${filter.name}: ${filter.filterType} ${filter.value}`}
        classNames={['filterSausage']}
        onClick={setFilterEditor(true)}
      />
      <SmallBtn onClick={() => removeFilter(filter.filterId)}>X</SmallBtn>
      <NewElementButton/>
    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  removeFilter: filterId => dispatch(removeFilter(filterId)),
});

export default connect(null, mapDispatchToProps)(FilterSausage);