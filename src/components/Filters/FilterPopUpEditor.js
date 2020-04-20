import React from 'react';
import { connect } from 'react-redux';
import { editFilter } from '../../actions/filters';
import FilterCreator from './FilterCreator';

const FilterEditor = ({ phaseId, classNames, columns, filter, addFilter, titleButton }) => {

  return (
    <FilterCreator
      titleButton={titleButton}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  editFilter: (name, phaseId, columnId, filterType, between) => dispatch(editFilter(name, phaseId, columnId, filterType, between)),
}) 

export default connect(null, mapDispatchToProps)(FilterEditor);