import React from 'react';
import { Paper, Card, Typography, makeStyles, CircularProgress, CardActionArea, CardContent, Avatar, Divider } from '@material-ui/core';
import CountUp from 'react-countup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as CONSTANTS from '../../Constants';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 2)
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 2.25, 2)
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2.75)
    }
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`
  },
  root1: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  }
}));

export default function StatsView(props) {

  const { title, value } = props;

  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.root}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Avatar >
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h4' component="h2" gutterBottom>
              {title}
            </Typography>
            <CircularProgress
              variant="determinate"
              // className={classes.bottom}
              size={25}
              thickness={8}
              // {...props}
              value={75}
            />
            <Typography variant="h6" component="h2">

              <CountUp
                start={0}
                end={value}
                duration={2.75}
                separator=","
              />
            </Typography>
            <Divider className={classes.divider} light />
            <Typography color="textSecondary">
              { CONSTANTS.MONTH_NAMES[new Date().getMonth()] + ' ' + new Date().getFullYear() }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  )
}
