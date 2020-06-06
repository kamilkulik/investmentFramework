import React from "react";
import { connect } from "react-redux";
import PhaseContainer from "../components/Phase/phaseContainer";
import ElementCreator from "../components/DefaultElement/ElementCreator";
import { setPhaseName } from "../actions/phases";

const StockSelector = ({ phases, setPhaseName }) => {
  return (
    <div className="main-layout">
      {phases &&
        phases.map((phase) => (
          <div key={phase.phaseId} className="main--phase">
            <PhaseContainer name={phase.name} phaseId={phase.phaseId} />
          </div>
        ))}
      <ElementCreator
        classNames="main--phase-creator"
        setElementName={setPhaseName}
        placeholder="Add phase"
        addText="Add Phase"
        btnText="+ Add next phase"
        type="phase"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  phases: state.phases,
});

const mapDispatchToProps = (dispatch) => ({
  setPhaseName: (name) => dispatch(setPhaseName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockSelector);
