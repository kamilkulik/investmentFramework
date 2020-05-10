import React from 'react';

export  const useIgnoreMountEffect = (func, deps) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, [deps])
}