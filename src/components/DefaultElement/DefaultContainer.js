import React, { useState, useMemo, memo } from "react";
import SmallBtn from "../SmallBtn";

const DefaultContainer = ({
  children,
  classNames,
  name,
  elementId,
  phaseId,
  index,
  removeElement,
  renameElement,
}) => {
  const [elementName, setElementName] = useState(name);
  const elementTextArea = React.createRef();

  const changeElementName = () => {
    if (elementName !== name && elementName) {
      renameElement(elementName, elementId);
    } else if (!elementName) {
      setElementName(name);
    }
  };

  const handleOnClick = (e) => {
    e.target.select();
  };

  const handleOnChange = (e) => {
    setElementName(e.target.value);
  };

  const handleRemoveEl = () => {
    removeElement(elementId, phaseId, index);
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      elementTextArea.current.blur();
    }
  };

  const classHandler = (classes) => {
    return !!classes ? classes : undefined;
  };

  const className = useMemo(() => classHandler(classNames), [classNames]);

  return (
    <>
      <div className={className}>
        <textarea
          rows="1"
          cols="10"
          type="text"
          wrap="off"
          onClick={handleOnClick}
          value={elementName}
          onChange={handleOnChange}
          ref={elementTextArea}
          onBlur={changeElementName}
          onKeyDown={onKeyPress}
        />
        <SmallBtn onClick={handleRemoveEl}>X</SmallBtn>
      </div>
      {children}
    </>
  );
};

export default memo(DefaultContainer);
