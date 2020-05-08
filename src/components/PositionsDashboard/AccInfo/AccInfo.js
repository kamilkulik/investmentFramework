import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccSummary from './AccSummary';
import AccForm from './AccForm';
import BrokerFeesForm from './BrokerFeesForm';

const AccInfo = () => {

  return (
    <Grid container spacing={1}>
      <Grid container item xs={4}>
        <AccForm />
      </Grid>
      <Grid container item xs={1}/>
      <Grid container item xs={4}>
        <AccSummary />
      </Grid>
      <Grid container item xs={1}/>
      <Grid container item xs={2}>
        <BrokerFeesForm />
    </Grid>
    </Grid>
  )  
}

export default AccInfo;