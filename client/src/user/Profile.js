import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import DeleteUser from "./DeleteUser";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Link, Redirect } from "react-router-dom";
import FollowProfileButton from "../user/FollowProfileButton";
import ProfileTabs from "../user/ProfileTabs";

const useStyles = makeStyles((theme) => ({
  root: { height: "100%" },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, redirectToSignin: true });
        } else {
          let following = checkFollow(data);
          setValues({ ...values, user: data, following: following });
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      values.user._id
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          user: data,
          following: !values.following,
        });
      }
    });
  };

  const photoUrl = values.user._id
    ? `http://localhost:4400/api/users/photo/${
        values.user._id
      }?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  if (values.redirectToSignin) return <Redirect to="/signin" />;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={4} xl={4}>
        <Paper className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={photoUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={values.user.name}
                secondary={values.user.email}
              />
              {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == values.user._id ? (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={values.user._id} />
                </ListItemSecondaryAction>
              ) : (
                <FollowProfileButton
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={values.user.about}
                secondary={
                  "Joined: " + new Date(values.user.created).toDateString()
                }
              />
            </ListItem>
          </List>
          <ProfileTabs user={values.user} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
