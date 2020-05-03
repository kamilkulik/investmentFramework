import React from 'react';
import { connect } from 'react-redux'
import DashboardContext from '../Dashboard-context';
import AssetContainer from './AssetContainer';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { calculateShares } from '../../../internalAPI/tradeData';
import { removeAsset } from '../../../actions/selected';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '20%',
    flexShrink: 0,
    fontSize: '1.5rem',
  },
  secondaryHeading: {
    flexBasis: '80%%'
  },
  bar: {
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}));

const AssetAccordion = ({ removeSelectedAsset }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { accInfo, selected } = React.useContext(DashboardContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const removeAsset = (rowId) => (event) => {
    event.stopPropagation()
    removeSelectedAsset(rowId)
  }

  return (
    <div className={classes.root}>
      {selected.map(asset => {
        const shares = calculateShares(accInfo, asset)
        return (
          <React.Fragment key={asset.rowId}>
            <ExpansionPanel 
              expanded={expanded === asset.rowId} 
              onChange={handleChange(asset.rowId)}
              >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${asset.rowId}bh-content`}
              id={`${asset.rowId}bh-header`}
            >
            <div className={classes.bar}>
              <FormControlLabel
              aria-label="Acknowledge"
              onClick={removeAsset(asset.rowId)}
              onFocus={(event) => event.stopPropagation()}
              control={
                <IconButton aria-label="delete" size='medium'>
                  <DeleteForeverIcon size='medium'/>
                </IconButton>}
              />
              <Typography className={classes.heading}>{asset.name}</Typography>
              <Typography className={classes.secondaryHeading}>{`No of shares: ${shares.noOfShares} Target Price: $${asset.targetPrice} Stop Loss Price: $${asset.stopLossPrice}`}
              </Typography>
            </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AssetContainer 
                rowId={asset.rowId}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </React.Fragment>
        )
      })}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeSelectedAsset: (rowId) => dispatch(removeAsset(rowId))
});

export default connect(null, mapDispatchToProps)(AssetAccordion);