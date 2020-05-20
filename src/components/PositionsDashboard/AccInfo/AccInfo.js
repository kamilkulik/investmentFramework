import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccSummary from './AccSummary';
import AutoLevels from './AutoLevels';
import AccForm from './AccForm';

const AccInfo = () => {

  return (
    <Grid container spacing={1}>
      <Grid container item xs={3}>
        <AccForm />
      </Grid>
      <Grid container item xs={1}/>
      <Grid container item xs={3}>
        <AccSummary />
      </Grid>
      <Grid container item xs={1}/>
      <Grid container item xs={3}>
        <AutoLevels />
      </Grid>
    </Grid>
  )  
}

export default AccInfo;