import React, { useContext } from 'react';
import DashboardContext from '../Dashboard-context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { summaryData } from '../../../internalAPI/tradeData';

const AccSummary = () => {
  const { accInfo, selected } = useContext(DashboardContext);
  const {
    estimatedTotalProfit,
    maxTotalLoss,
    accReturnRiskRatio,
    fundsToAllocate,
    fundsCommitted,
  } = summaryData(accInfo, selected);

  return (
    <List component='nav' aria-label='mailbox folders'>
      <ListItem button divider>
        <ListItemText
          primary={`Estimated Total Profit: $${estimatedTotalProfit
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          primary={`Max Total Loss: $${maxTotalLoss
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          primary={`Account Return / Risk Ratio: ${accReturnRiskRatio}`}
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          primary={`Funds to allocate: $${fundsToAllocate
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          primary={`Funds committed: $${fundsCommitted
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
        />
      </ListItem>
    </List>
  );
};

export default AccSummary;
