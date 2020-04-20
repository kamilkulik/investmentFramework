import React from 'react';

const newElementButton = ({ children, classNames = [], title, buttonAction }) => {
  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }
  return (
    <div className={`creator--button-title ${cssClassNames.join(' ')}`}>
      <button 
        onClick={() => buttonAction()}
        >
        {title}
        </button>
        {children}
    </div>
  );
}

export default newElementButton;