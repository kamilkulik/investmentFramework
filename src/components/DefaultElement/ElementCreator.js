import React, { useState, useMemo } from 'react'
import NewElementButton from '../newElementButton'

const ElementCreatorContainer = ({
  setElementName,
  placeholder,
  addText,
  btnText,
  classNames,
  phaseId,
  columns = [],
  rows = [],
  type,
}) => {
  const [elementCreator, setElementCreator] = useState(false)
  const [elementName, setElementNameState] = useState('')
  const [inputFocused, setInputFocus] = useState(false)
  const elementNameRef = React.createRef()

  const setElement = () => {
    if (elementName) {
      if (type === 'row') {
        setElementName(elementName, phaseId, columns)
      } else if (type === 'column') {
        setElementName(elementName, phaseId, rows)
      } else if (type === 'phase') {
        setElementName(elementName)
      } else if (type === 'selectedAsset') {
        setElementName(elementName)
      }
      setElementNameState('')
      setElementCreator(false)
    }
    setInputFocus(false)
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      elementNameRef.current.blur()
    }
  }

  const handleOnChange = (e) => {
    setElementNameState(e.target.value)
  }

  const handleElementCreator = () => {
    setElementCreator(!elementCreator)
  }

  const classHandler = (classes) => {
    return !!classes ? classes : undefined
  }

  const handleFocus = () => {
    setInputFocus(true)
  }

  const className = useMemo(() => classHandler(classNames), [classNames])

  return (
    <div className={`${className} creator`}>
      {elementCreator ? (
        <div>
          <input
            type='text'
            placeholder={placeholder}
            ref={elementNameRef}
            value={elementName}
            onChange={handleOnChange}
            onKeyDown={onKeyPress}
            onBlur={setElement}
            onFocus={handleFocus}
          />
          <button className='creator--button' onClick={setElement}>
            {addText}
          </button>
          <button className='creator--button-x' onClick={handleElementCreator}>
            X
          </button>
        </div>
      ) : (
        <NewElementButton title={btnText} buttonAction={handleElementCreator} />
      )}
    </div>
  )
}

export default ElementCreatorContainer
