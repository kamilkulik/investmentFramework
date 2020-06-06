import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addFilter } from '../../actions/filters';
import filterTypes from './FilterTypes';
import NewElementButton from '../newElementButton';

const FilterCreator = ({
  phaseId,
  classNames = [],
  columns,
  filters,
  addFilter,
  titleButton,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState('');
  const [filterCreator, setFilterCreator] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filterValueBetween, setFilterValueBetween] = useState([]);
  const filterNameRef = React.createRef();

  const setFilter = () => {
    const columnId = columns.find((c) => c.name === selectedFilter).columnId;
    const value = filterValue ? filterValue : filterValueBetween;
    addFilter(selectedFilter, phaseId, columnId, selectedFilterType, value);
    setSelectedFilterType('');
    setFilterValue('');
    setFilterValueBetween([]);
    setFilterCreator(false);
  };

  const handleBetween = (e) => {
    let value = e.target.value;
    e.target.name === 'filterBetweenMin'
      ? (filterValueBetween[0] = value)
      : (filterValueBetween[1] = value);
  };

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames);
  }

  const usedFilters = filters.map((filter) => filter.columnId);
  const availableFilters = columns.filter(
    (column) => !usedFilters.includes(column.columnId)
  );

  return (
    <div className={`${cssClassNames.join(' ')} creator`}>
      {filterCreator ? (
        <div>
          <div>
            <p>Which indicator should filter our assets?</p>
            <select
              id='filterSelect'
              onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value=''>Select indicator</option>
              {availableFilters.map((column) => {
                return (
                  <option key={column.name} value={column.name}>
                    {column.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>What type of filter is this?</p>
            <select
              id='filterType'
              onChange={(e) => setSelectedFilterType(e.target.value)}>
              <option value=''>Select type</option>
              {filterTypes.map((type) => {
                return (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          {selectedFilterType === 'BETWEEN' ? (
            <React.Fragment>
              <input
                name='filterBetweenMin'
                type='text'
                placeholder={`Enter MIN value`}
                value={filterValueBetween[0]}
                onChange={handleBetween}
              />
              <input
                name='filterBetweenMax'
                type='text'
                placeholder={`Enter MAX value`}
                value={filterValueBetween[1]}
                onChange={handleBetween}
              />
            </React.Fragment>
          ) : (
            <input
              type='text'
              placeholder={`Enter ${selectedFilterType} value`}
              ref={filterNameRef}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
          <button className='creator--button' onClick={setFilter}>
            Add Filter
          </button>
          <button
            className='creator--button-x'
            onClick={() => setFilterCreator(false)}>
            X
          </button>
        </div>
      ) : (
        <NewElementButton
          title={titleButton}
          buttonAction={() => setFilterCreator(true)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  columns: state.columns.filter(
    (column) => column.phaseId === ownProps.phaseId
  ),
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: (name, phaseId, columnId, filterType, between) =>
    dispatch(addFilter(name, phaseId, columnId, filterType, between)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCreator);
