import React, { useState } from 'react';
import NewElementButton from '../newElementButton';

const ElementCreatorContainer = ({ setElementName, placeholder, addText, btnText, classNames, phaseId, columns = [], rows = [], type }) => {

  const [elementCreator, setElementCreator] = useState(false);
  const [elementName, setElementNameState] = useState('');
  const elementNameRef = React.createRef();
  
  const setElement = () => {
    if (elementName) {
      if (type === 'row') {
        setElementName(elementName, phaseId, columns);
      } else if (type === 'column') {
        setElementName(elementName, phaseId, rows);
      } else if (type === 'phase') {
        setElementName(elementName);
      }
      setElementNameState('');
      setElementCreator(false);
    } 
  }
  
  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      elementNameRef.current.blur();
    }
  }

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }

  return (
    <div className={`${cssClassNames.join(' ')} creator`} >
      {elementCreator ? 
        <div>
          <input 
            type='text'
            placeholder={placeholder}
            ref={elementNameRef}
            value={elementName}
            onChange={(e) => setElementNameState(e.target.value)}
            onKeyDown={onKeyPress}
            onBlur={setElement}
            />
          <button 
            className='creator--button'
            onClick={setElement}
            >{addText}</button>
          <button 
            className='creator--button-x' 
            onClick={() => setElementCreator(false)}
            >X</button>
        </div> :
        <NewElementButton 
        title={btnText}
        buttonAction={() => setElementCreator(true)}
        />
      }
    </div>
  );
}

export default ElementCreatorContainer;
