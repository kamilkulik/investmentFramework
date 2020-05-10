import React from 'react';
import PriceForm from './PriceForm';
import TradeDetails from './TradeDetails';
import Grid from '@material-ui/core/Grid';

const AssetContainer = ({ rowId }) => {
  return (
    <Grid container spacing={1}>
      <Grid container item xs={3}>
        <PriceForm 
          rowId={rowId}
        />
      </Grid>
      <Grid container item xs={1}/>
      <Grid container item xs={6}>
        <TradeDetails 
          rowId={rowId}
        />
      </Grid>
    </Grid>
  )
}

export default AssetContainer;