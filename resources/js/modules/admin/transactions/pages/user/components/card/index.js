import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  mainDetails: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    marginLeft: 25,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    height: 'auto',
    maxWidth: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const user = props.user;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="http://localhost/storage/test.png"
        title="Live from space album cover"
      />
      <div className={classes.mainDetails}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.address}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.phoneNumber}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            Balance
          </Typography>
          <Typography component="h6" variant="h6">
            {user.balance}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            Rebate
          </Typography>
          <Typography component="h6" variant="h6">
            {user.rebate}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Transactions
          </Typography>
          <Typography component="h6" variant="h6">
            {user.transactionCount}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}