import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import auth from "../auth/auth-helper";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import mistralImg from "../assets/images/mistral.jpg";
import FindPeople from "../user/FindPeople";
import Newsfeed from "../post/Newsfeed";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 200,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

const Home = ({ history }) => {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={8}
        justifyContent="center"
        style={{ overflow: "none" }}
      >
        <Grid item xs={12} md={6} lg={4} xl={6}>
          <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography variant="h4" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia
              className={classes.media}
              image={mistralImg}
              title="Mistral on the Top"
            />

            <Typography
              variant="body2"
              component="p"
              className={classes.credit}
              color="textSecondary"
            >
              Photo
            </Typography>
            <CardContent>
              <Typography variant="body1" component="p">
                Welcome to the Membership home page.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {defaultPage && (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={5} lg={5} xl={5}>
            <Newsfeed />
          </Grid>
          <Grid item xs={12} md={5} lg={5} xl={5}>
            <FindPeople />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Home;
