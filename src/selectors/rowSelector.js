export default (rows, columns, filters, values) => {
  if (rows.length > 0 && columns.length > 0 && filters.length > 0) {
    return rows.filter((row) => {
      const rowId = row.rowId;
      return (
        minmaxFilter("MIN", rowId, filters, values) &&
        minmaxFilter("MAX", rowId, filters, values) &&
        minmaxFilter("BETWEEN", rowId, filters, values)
      );
    });
  } else {
    return rows;
  }
};

/* inputs: 
  a. rows relevant to current phase
  b. columns relevant to current phase
  c. filters relevant to current phase
  d. values relevant to current phase

  outputs:
  a. array of rows after applying ALL filters

  algorithm:
    1. put all inputs through predefined filters.
*/

//  inputs: index (of the row), columns, filters
const minmaxFilter = (type, rowId, filters, values) => {
  //  1. find all applied filters / array of objects - filters
  const typeValueFilters = filters.filter(
    (filter) => filter.filterType === type
  );
  //  2. find all values whose columnId matches that of all MIN filters
  const usedFiltersColumnIds = typeValueFilters.map((el) => el.columnId); // array of columnIds
  const filterColumns = values.filter((value) =>
    usedFiltersColumnIds.includes(value.columnId)
  ); // array of values (full objects) with whose columnId matches that of filters'
  const relevantValuesObjects = filterColumns.filter(
    (value) => value.rowId === rowId
  );
  // 3.  get values of arrays from items 1 & 2
  const usedFiltersValues = typeValueFilters.map((el) => el.value); // array of values from filter objects
  const filterColumnsValues = relevantValuesObjects.map((el) => el.value); // array of values - strings (from values)
  // 4. check one-by-one if filterColumn values are greater than those of (compare those arrays - corresponding values (same index) one needs to be greater from another)
  const test = usedFiltersValues.every((cur, index) => {
    let testResult;
    const filteredValue = parseFloat(filterColumnsValues[index]);
    if (type === "MIN") {
      testResult = parseFloat(cur) < filteredValue;
    } else if (type === "MAX") {
      testResult = parseFloat(cur) > filteredValue;
    } else if (type === "BETWEEN") {
      testResult =
        parseFloat(cur[1]) > filteredValue &&
        parseFloat(cur[0]) < filteredValue;
    }
    return testResult;
  });
  const typeFilterPassed = typeValueFilters.length === 0 ? true : test;
  // outputs: true or false - depending if all row's values pass through all enabled MIN filters
  return typeFilterPassed;
};
