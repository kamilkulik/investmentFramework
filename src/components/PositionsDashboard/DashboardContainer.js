import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import DashboardContext from './Dashboard-context';
import AccInfo from './AccInfo/AccInfo';
import AssetAccordion from './AssetsAccordion/AssetAccordion';

const DashboardContainer = ({ classNames = [], selected, accInfo }) => {

  const cssClassNames = [];
  if (classNames.length > 0) {
    Array.prototype.push.apply(cssClassNames, classNames)
  }
  return (
    <DashboardContext.Provider value={{ selected, accInfo }}>
    <div className={cssClassNames.join(' ')}>
      <Container maxWidth='md'>
        <AccInfo />
      </Container>
      <Container maxWidth='md'>
        <AssetAccordion />
      </Container>
    </div>
    </DashboardContext.Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected,
    accInfo: state.accInfo
  }
}

export default connect(mapStateToProps, null)(DashboardContainer);