import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import auth from "./../auth/auth-helper";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const isActive = (history, path) =>
  history.location.pathname == path
    ? { color: "#ff4081" }
    : { color: "#ffffff" };

const useStyles = makeStyles({
  buttons: {
    textTransform: "none",
  },
  links: {
    textDecoration: "none",
    marginLeft: "auto",
  },
});

const Menu = ({ history }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Simple social networks app
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <Tooltip title="Return to home page">
              <Home />
            </Tooltip>
          </IconButton>
        </Link>
        <Link to="/users" className={classes.links}>
          <Button
            style={isActive(history, "/users")}
            className={classes.buttons}
          >
            Users
          </Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup" className={classes.links}>
              <Button
                style={isActive(history, "/signup")}
                className={classes.buttons}
              >
                Sign Up
              </Button>
            </Link>

            <Link to="/signin" className={classes.links}>
              <Button
                style={isActive(history, "/signin")}
                className={classes.buttons}
              >
                Sign In
              </Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link
              to={"/user/" + auth.isAuthenticated().user._id}
              className={classes.links}
            >
              <Button
                className={classes.buttons}
                style={isActive(
                  history,
                  "/user/" + auth.isAuthenticated().user._id
                )}
              >
                My Profile
              </Button>
            </Link>
            <Button
              className={classes.buttons}
              color="inherit"
              onClick={() => {
                auth.clearToken(() => history.push("/"));
              }}
            >
              Sign Out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(Menu);
