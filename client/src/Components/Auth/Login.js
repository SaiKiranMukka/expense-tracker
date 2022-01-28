import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Grid, Typography, makeStyles, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import  { Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserService } from '../../Services/user.service';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made with Love '} &hearts; <FavoriteIcon/> 
      <Link component={RouterLink} to="/register">
        Sai Kiran 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(20),
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(24)
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Login({ setToken }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  //console.log(location.state);
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await UserService.login({ 
      email, 
      password 
    });
    setToken(token);
    console.log(`From: ${from}`);
    navigate(from, { replace: true });
    // navigate('/');
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/register" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
