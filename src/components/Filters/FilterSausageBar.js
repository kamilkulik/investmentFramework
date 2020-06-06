import React from "react";
import FilterSausage from "./FilterSausage";

const FilterSausageBar = ({ filters }) => {
  return (
    <div className="phase--filterBar filterBar">
      {filters.map((filter) => (
        <FilterSausage key={filter.name} filter={filter} />
      ))}
    </div>
  );
};

export default FilterSausageBar;
