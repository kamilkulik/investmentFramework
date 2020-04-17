import React, { useState } from 'react';
import SmallBtn from '../SmallBtn';

const DefaultContainer = ({ children, classNames = [], name, elementId, phaseId, index, removeElement, renameElement }) => {

  const [elementName, setElementName] = useState(name)
  const elementTextArea = React.createRef();

  const changeElementName = () => {
    if (elementName !== name) {
      renameElement(elementName, elementId)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      elementTextArea.current.blur();
    }
  }

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }

  return (
    <>
    <div className={`${cssClassNames.join(' ')}`}>
      <textarea rows='1' cols='10' type='text' wrap='off'
        style={{ resize: 'none', border: 'none' }} 
        onClick={(e) => e.target.select()}
        value={elementName}
        onChange={(e) => setElementName(e.target.value)}
        ref={elementTextArea}
        onBlur={changeElementName}
        onKeyDown={onKeyPress}
      /> 
      <SmallBtn onClick={() => removeElement(elementId, phaseId, index)}>X</SmallBtn>
    </div>
    {children}
  </>)
};

export default (DefaultContainer);