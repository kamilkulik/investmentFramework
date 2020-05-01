import React, { useContext } from 'react';
import DashboardContext from '../Dashboard-context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AccSummary = () => {

  const { accInfo } = useContext(DashboardContext);

  return (
    <List component="nav" aria-label="mailbox folders">
      <ListItem button divider>
        <ListItemText primary={`Target Profit: ${'250k'}`} />
      </ListItem>
      <ListItem button divider>
        <ListItemText primary={`MaxLoss: ${'20k'}`} />
      </ListItem>
      <ListItem button divider>
        <ListItemText primary={`Account Return / Risk Ratio: ${'3'}`} />
      </ListItem>
      <ListItem button divider>
        <ListItemText primary={`Funds to allocate: ${'40%'}`} />
      </ListItem>
    </List>
  )  
}

export default AccSummary;