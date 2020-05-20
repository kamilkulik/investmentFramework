import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 14,
  },
});

const SimpleCard = ({ children, minWidth, cardTitle, actionText, buttonAction }) => {
  const classes = useStyles();

  return (
    <Card style={{ minWidth: minWidth }} className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {cardTitle}
        </Typography>
        {children}
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={buttonAction}
          >{actionText}</Button>
      </CardActions>
    </Card>
  );
}

export default SimpleCard;