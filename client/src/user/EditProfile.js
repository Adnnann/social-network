import React, { useState, useEffect } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Icon,
    Typography,
    makeStyles,
} from "@material-ui/core";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },

    error: {
        verticalAlign: "middle",
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.protectedTitle,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    submit: {
        margin: "auto",
        marginBottom: theme.spacing(2),
    },
}));

const EditProfile = ({ match }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: "",
        password: "",
        about: "",
        email: "",
        photo: "",
        open: false,
        error: "",
        id: "",
        redirectToProfile: false,
    });

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
            (data) => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        id: data._id,
                        name: data.name,
                        about: data.about,
                        email: data.email,
                    });
                }
            }
        );

        return function cleanup() {
            abortController.abort();
        };
    }, [match.params.userId]);

    const clickSubmit = () => {
        let userData = new FormData();
        values.name && userData.append("name", values.name);
        values.email && userData.append("email", values.email);
        values.password && userData.append("password", values.password);
        values.about && userData.append("about", values.about);
        values.photo && userData.append("photo", values.photo);
        update(
            {
                userId: match.params.userId,
            },
            {
                t: jwt.token,
            },
            userData
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    userId: data?._id,
                    redirectToProfile: true,
                });
            }
        });
        console.log(values);
    };

    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };

    if (values.redirectToProfile)
        return <Redirect to={"/user/" + values.userId} />;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
                </Typography>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleChange("photo")}
                    className={classes.input}
                    style={{ display: "none" }}
                    id="icon-button-file"
                />
                <label htmlFor="icon-button-file">
                    <Button
                        variant="contained"
                        color="default"
                        component="span"
                    >
                        Upload
                        <FileUpload />
                    </Button>
                </label>
                <span className={classes.filename}>
                    {values.photo ? values.photo.name : ""}
                </span>
                <br />
                <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                />
                <br />
                <TextField
                    id="about"
                    label="About"
                    multiline
                    rows="2"
                    className={classes.textField}
                    value={values.about}
                    onChange={handleChange("about")}
                    margin="normal"
                />
                {/* <br /> */}
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange("email")}
                />
                <br />

                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange("password")}
                />
                <br />
                {values.error && (
                    <Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={clickSubmit}
                    className={classes.submit}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
};

export default EditProfile;
