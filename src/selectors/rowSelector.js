export default (rows, columns, filters) => {
  if (rows.length > 0 && columns.length > 0 && filters.length > 0) {
    return rows.filter((row, index) => {
      return minmaxFilter('MIN', index, columns, filters) && minmaxFilter('MAX', index, columns, filters) && minmaxFilter('BETWEEN', index, columns, filters)
    })
  } else {
    return rows
  }
  
}

/* inputs: 
  a. rows relevant to current phase
  b. columns relevant to current phase
  c. filters relevant to current phase

  outputs:
  a. array of rows after applying ALL filters

  algorithm:
    1. put all inputs through predefined filters.
*/

//  inputs: index (of the row), columns, filters
const minmaxFilter = (type, rowIndex, columns, filters) => {
//  1. find all MIN filters
  const typeValueFilters = filters.filter(filter => filter.filterType === type);
//  2. find all columns whose columnId matches that of all MIN filters
  const usedFiltersColumnIds = typeValueFilters.map(el => el.columnId);
  const filterColumns = columns.filter(column => usedFiltersColumnIds.includes(column.columnId));
// 3.  get values of arrays from items 1 & 2
  const usedFiltersValues = typeValueFilters.map(el => el.value);
  const filterColumnsValues = filterColumns.map(el => el.values[rowIndex]);
// 4. check one-by-one if filterColumn values are greater than those of (compare those arrays - corresponding values (same index) one needs to be greater from another)
  const test = usedFiltersValues.every((cur, index) => {
    let testResult;
    const filteredValue = parseFloat(filterColumnsValues[index]);
    if (type === 'MIN') { 
      testResult = parseFloat(cur) < filteredValue 
    } else if (type === 'MAX') { 
      testResult = parseFloat(cur) > filteredValue 
    } else if (type === 'BETWEEN') {
      testResult = parseFloat(cur[1]) > filteredValue &&
      parseFloat(cur[0]) < filteredValue
    }
    return testResult;
  });
  const typeFilterPassed = typeValueFilters.length === 0 ? true : test;
// outputs: true or false - depending if all row's values pass through all enabled MIN filters
  return typeFilterPassed
};