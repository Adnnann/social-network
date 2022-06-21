import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/ImageList";
import { ImageListItem } from "@material-ui/core";
import { listByUser } from "../post/api-post";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
  },
}));
export default function FollowGrid({ people }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        rowHeight={160}
        className={people.length === 0 ? null : classes.gridList}
        cols={4}
      >
        {people.map((person, index) => {
          return (
            <ImageListItem style={{ height: 120 }} key={index}>
              <Link to={"/user/" + person._id}>
                <Avatar
                  src={`http://localhost:4400/api/users/photo/${
                    person._id
                  }?${new Date().getTime()}`}
                  className={classes.bigAvatar}
                />
                <Typography className={classes.tileText}>
                  {person.name}
                </Typography>
              </Link>
            </ImageListItem>
          );
        })}
      </GridList>
    </div>
  );
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};
