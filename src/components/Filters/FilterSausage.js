import React from 'react';
import NewElementButton from '../newElementButton';
import SmallBtn from '../SmallBtn';
import { connect } from 'react-redux';
import { removeFilter } from '../../actions/filters';

const FilterSausage = ({ filter, removeFilter }) => {
  const handleClick = () => {
    removeFilter(filter.filterId);
  };

  return (
    <React.Fragment>
      <NewElementButton
        title={`${filter.name}: ${filter.filterType} ${filter.value}`}
        classNames={['filterSausage']}
      />
      <SmallBtn onClick={handleClick}>X</SmallBtn>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeFilter: (filterId) => dispatch(removeFilter(filterId)),
});

export default connect(null, mapDispatchToProps)(FilterSausage);
