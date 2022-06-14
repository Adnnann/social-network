import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import auth from "../auth/auth-helper";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@material-ui/core";
import pexels from "../assets/images/pexels.jpg";
import FindPeople from "../user/FindPeople";
import Newsfeed from "../post/Newsfeed";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
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
        minHeight: 400,
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
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Card>
                        <Typography variant="h4" className={classes.title}>
                            Home Page
                        </Typography>
                        <CardMedia
                            className={classes.media}
                            image={pexels}
                            title="City"
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
                <Grid container spacing={8}>
                    <Grid item xs={8} sm={7}>
                        <Newsfeed />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <FindPeople />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default Home;
