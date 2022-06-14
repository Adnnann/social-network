import React from "react";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import auth from "./../auth/auth-helper";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const isActive = (history, path) =>
    history.location.pathname == path
        ? { color: "#ff4081" }
        : { color: "#ffffff" };

const Menu = ({ history }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                MERN Skeleton
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <Home />
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>Users</Button>
            </Link>
            {!auth.isAuthenticated() && (
                <span>
                    <Link to="/signup">
                        <Button style={isActive(history, "/signup")}>
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/signin">
                        <Button style={isActive(history, "/signin")}>
                            Sign In
                        </Button>
                    </Link>
                </span>
            )}
            {auth.isAuthenticated() && (
                <span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <Button
                            style={isActive(
                                history,
                                "/user/" + auth.isAuthenticated().user._id
                            )}
                        >
                            My Profile
                        </Button>
                    </Link>
                    <Button
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

export default withRouter(Menu);
