import React from 'react';

const ColumnItemBox = ({ classNames = [], children }) => {

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }

  return (
    <div className={`table--grid-item column-item ${cssClassNames}`}>
      {children}
    </div>
  )
}

export default ColumnItemBox;