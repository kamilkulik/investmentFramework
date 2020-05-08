import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import DashboardContext from './Dashboard-context';
import AccInfo from './AccInfo/AccInfo';
import AssetAccordion from './AssetsAccordion/AssetAccordion';
import AddAnotherAsset from '../DefaultElement/ElementCreator';
import { addAsset } from '../../actions/selected';

const DashboardContainer = ({ classNames = [], selected, accInfo, addAsset }) => {

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
      <AddAnotherAsset
        setElementName={addAsset} 
        addText='Add Asset'
        btnText='+ Add Asset'
        placeholder='Enter Asset Name'
        type='selectedAsset'
      />
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

const mapDispatchToProps = (dispatch) => ({
  addAsset: (assetName) => dispatch(addAsset(assetName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);