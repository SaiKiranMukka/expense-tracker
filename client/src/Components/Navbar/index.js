import React, { useState } from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, makeStyles } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link as RouterLink } from "react-router-dom";
import { UserService } from '../../Services/user.service';
import useAuthToken from '../../Hooks/useAuthToken';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
  },
  navItems: {
    marginLeft: theme.spacing(0.75),
  },
  title: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { removeToken } = useAuthToken();

  const handleLogout = async () => {
    await UserService.logout();
    removeToken();
    window.location.reload(true);
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-account-menu';

  const renderExpenseMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={RouterLink} to="/addExpense" onClick={handleMenuClose}>Add Expense</MenuItem>
      <MenuItem component={RouterLink} to="/expenses" onClick={handleMenuClose}>View Expenses</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to="/" onClick={handleMobileMenuClose}>
        <IconButton aria-label="Dashboard" color="inherit">
          <DashboardIcon />
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ListAltIcon />
        </IconButton>
        <p>Expense</p>
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <IconButton aria-label="logout" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* <MenuIcon /> */}
            <TrendingUpIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Expense Tracker
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton 
              aria-label="Dashboard" 
              color="inherit" 
              component={RouterLink} to="/">
              <DashboardIcon />
              <Typography className={classes.navItems} variant="h6" noWrap>
                Dashboard
              </Typography>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="expenses of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ListAltIcon />
              <Typography className={classes.navItems} variant="h6" noWrap>
                Expenses
              </Typography>
            </IconButton>

            <IconButton aria-label="logout" color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
              <Typography className={classes.navItems} variant="h6" noWrap>
                Logout
              </Typography>
            </IconButton>
          </div>

          {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      {renderExpenseMenu}
    </div>
  );
}
