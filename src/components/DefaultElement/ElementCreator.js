import React, { useState } from 'react';
import NewElementButton from '../newElementButton';

const ElementCreatorContainer = ({ setElementName, placeholder, addText, btnText, classNames, phaseId, columns = [], rows = [], addGenericColumnValue, type }) => {

  const [elementCreator, setElementCreator] = useState(false);
  const [elementName, setElementNameState] = useState('');
  const elementNameRef = React.createRef();
  
  const setElement = () => {
    let initialValuesCount = rows.length;
    setElementName(elementName, phaseId, initialValuesCount);
    type === 'row' && columns.length > 0 && addGenericColumnValue(phaseId); 
    setElementNameState('');
    setElementCreator(false);
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
