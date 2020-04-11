import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removePhase, renamePhase } from '../../actions/phases';
import CardCreatorContainer from '../../components/Card/CardCreatorContainer';
import CardContainer from '../../components/Card/CardContainer';
import ColumnCreatorContainer from '../../components/Column/ColumnCreatorContainer';
import ColumnContainer from '../../components/Column/ColumnContainer';

const PhaseContainer = ({ name, phaseId, removePhase, renamePhase, cards, columns }) => {

  const [optionsPopover, setOptionsPopover] = useState(false);
  const [phaseName, setPhaseName] = useState(name)
  const nameTextArea = React.createRef();

  const changePhaseName = (e) => {
    if (phaseName !== name) {
      e.preventDefault()
      renamePhase(phaseName, phaseId)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      nameTextArea.current.blur();
    }
  }

  return (
    <div>
      <form 
        onBlur={changePhaseName}
        onKeyDown={onKeyPress}
        >
        <textarea rows='1' cols='20' type='text' style={{ resize: 'none', ':hover': {cursor : 'pointer'}, border: 'none' }} 
        onClick={(e) => e.target.select()}
        value={phaseName}
        onChange={(e) => setPhaseName(e.target.value)}
        ref={nameTextArea}
        /> 
      </form>
      <button onClick={() => setOptionsPopover(!optionsPopover)}>...</button>
      {optionsPopover && 
        <div>
          <button onClick={() => removePhase(phaseId)}>X</button>
        </div>}
      {cards.length > 0 ? 
        <div>
          <div>{
            cards.map((card, index) => (
              <div key={card.cardId}>
                <CardContainer 
                  name={card.name}
                  cardId={card.cardId}
                  phaseId={card.phaseId}
                  index={index}
                />
              </div>
            ))
          }</div>
          <div>
            <div>{
              columns.map(column => (
                <div key={column.columnId}>
                  <ColumnContainer 
                    name={column.name}
                    columnId={column.columnId}
                    phaseId={column.phaseId}
                  />
                </div>
              ))
            }</div>
            <ColumnCreatorContainer 
              phaseId={phaseId}
            />
          </div>
        </div>
        :
      <CardCreatorContainer
        phaseId={phaseId}
      />
      }
      {cards.length > 0 ?
        <CardCreatorContainer
          phaseId={phaseId}
        /> :
        '' 
      }
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter((card) => card.phaseId === ownProps.phaseId),
  columns: state.columns.filter((column) => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = dispatch => ({
  removePhase: (id) => dispatch(removePhase(id)),
  renamePhase: (name, phaseId) => dispatch(renamePhase(name, phaseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);