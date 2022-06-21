import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FollowGrid from "./../user/FollowGrid";
import PostList from "../post/PostList";
import { listByUser } from "../post/api-post";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const id = useParams().userId;

  useEffect(() => {
    listByUser(id)
      .then((response) => setPosts(response))
      .catch((err) => console.log(err));
    setTab(0);
  }, [id]);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <>
      <div>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </div>
      {tab === 0 ? (
        <TabContainer>
          {posts.length > 0 ? (
            <PostList posts={posts} removeUpdate={removePost} />
          ) : (
            <Typography
              variant="h6"
              style={{ marginTop: "20px" }}
              color="textPrimary"
            >
              No published posts
            </Typography>
          )}
        </TabContainer>
      ) : null}
      {tab === 1 ? (
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      ) : null}
      {tab === 2 ? (
        <TabContainer>
          <FollowGrid people={props.user.followers} />
        </TabContainer>
      ) : null}
    </>
  );
}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
};

const TabContainer = (props) => {
  return <Typography component="div">{props.children}</Typography>;
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
