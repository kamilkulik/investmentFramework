import React from 'react';
import { connect } from 'react-redux';
import { addFilter } from '../../actions/filters';

const FilterCreator = ({ phaseId, classNames }) => {
  const [filterCreator, setFilterCreator] = useState(false);
  const [filterName, setFilterNameState] = useState('');
  const filterNameRef = React.createRef();
  
  const setFilter = () => {
    addFilter(filterName, columnId, type, between);
    setFilterNameState('');
    setFilterCreator(false);
  }
  
  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      filterNameRef.current.blur();
    }
  }

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }

  return (
    <div className={`${cssClassNames.join(' ')} creator`} >
      {filterCreator ? 
        <div>
          <input 
            type='text'
            placeholder={'placeholder'}
            ref={elementNameRef}
            value={elementName}
            onChange={(e) => setFilterNameState(e.target.value)}
            onKeyDown={onKeyPress}
            onBlur={setFilter}
            />
          <button 
            className='creator--button'
            onClick={setFilter}
            >{addText}</button>
          <button 
            className='creator--button-x' 
            onClick={() => setFilterCreator(false)}
            >X</button>
        </div> :
        <NewElementButton 
        title={btnText}
        buttonAction={() => setFilterCreator(true)}
        />
      }
    </div>
  );
}

mapStateToProps = (state, ownProps) => ({
  columns: state.columns.filter(column => column.phaseId === ownProps.phaseId)
})

mapDispatchToProps = dispatch => ({
  addFilter: (name, columnId, type, between) => dispatch(addFilter(name, columnId, type, between)),
}) 

export default connect(mapStateToProps, mapDispatchToProps)(FilterCreator);