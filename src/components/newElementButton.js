import React, { useMemo } from 'react';

const NewElementButton = ({
  children,
  classNames = [],
  title,
  buttonAction,
}) => {
  const cssClassNames = useMemo(() => classNames.join(' '), [classNames]);

  const actionHandler = () => buttonAction();

  return (
    <div className={`creator--button-title ${cssClassNames}`}>
      <button onClick={actionHandler}>{title}</button>
      {children}
    </div>
  );
};

export default NewElementButton;
