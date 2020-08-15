import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter } from '../../actions/filters';
import filterTypes from './FilterTypes';
import NewElementButton from '../newElementButton';

const initialState = {
  selectedFilter: '',
  selectedFilterType: '',
  filterValue: '',
  filterBetweenMin: '',
  filterBetweenMax: '',
};

const FilterCreator = ({ phaseId, classNames = [], titleButton }) => {
  const [filterConfig, setFilterConfig] = useState(initialState);
  const [filterCreator, setFilterCreator] = useState(false);
  const columns = useSelector((state) =>
    state.columns.filter((column) => column.phaseId === phaseId)
  );
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const setFilterConfigHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilterConfig({
      ...filterConfig,
      [name]: value,
    });
  };

  const setFilterCreatorHandler = (value) => () => {
    setFilterCreator(value);
  };

  const setFilter = () => {
    const {
      selectedFilter,
      selectedFilterType,
      filterValue,
      filterBetweenMax,
      filterBetweenMin,
    } = filterConfig;
    const columnId = columns.find((c) => c.name === selectedFilter).columnId;
    const value = +filterValue || [+filterBetweenMin, +filterBetweenMax];

    dispatch(
      addFilter(selectedFilter, phaseId, columnId, selectedFilterType, value)
    );

    setFilterConfig({
      ...initialState,
      selectedFilter,
    });
    setFilterCreator(false);
  };

  const cssClassNames = useMemo(() => classNames.join(' '), [classNames]); // ?
  const usedFilters = filters.map((filter) => filter.columnId);
  const availableFilters = columns.filter(
    (column) => !usedFilters.includes(column.columnId)
  );

  return (
    <div className={`${cssClassNames} creator`}>
      {filterCreator ? (
        <div>
          <div>
            <p>Which indicator should filter our assets?</p>
            <select
              id='filterSelect'
              name='selectedFilter'
              onChange={setFilterConfigHandler}>
              <option value=''>Select indicator</option>
              {availableFilters.map(({ name }) => {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>What type of filter is this?</p>
            <select
              id='filterType'
              name='selectedFilterType'
              onChange={setFilterConfigHandler}>
              <option value=''>Select type</option>
              {filterTypes.map(({ name }) => {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          {filterConfig.selectedFilterType === 'BETWEEN' ? (
            <React.Fragment>
              <input
                name='filterBetweenMin'
                type='text'
                placeholder={`Enter MIN value`}
                value={filterConfig.filterBetweenMin}
                onChange={setFilterConfigHandler}
              />
              <input
                name='filterBetweenMax'
                type='text'
                placeholder={`Enter MAX value`}
                value={filterConfig.filterBetweenMax}
                onChange={setFilterConfigHandler}
              />
            </React.Fragment>
          ) : (
            <input
              type='text'
              placeholder={`Enter ${filterConfig.selectedFilterType} value`}
              value={filterConfig.filterValue}
              name='filterValue'
              onChange={setFilterConfigHandler}
            />
          )}
          <button className='creator--button' onClick={setFilter}>
            Add Filter
          </button>
          <button
            className='creator--button-x'
            onClick={setFilterCreatorHandler(false)}>
            X
          </button>
        </div>
      ) : (
        <NewElementButton
          title={titleButton}
          buttonAction={setFilterCreatorHandler(true)}
        />
      )}
    </div>
  );
};

export default FilterCreator;
