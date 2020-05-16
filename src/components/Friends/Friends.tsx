import React, { useState } from "react";
import Image from "material-ui-image";

import { useQuery, useMutation } from "@apollo/client";

import { LIKE } from "../Favourites/likeStatusMutation";
import { USER_PROFILE } from "../Profile/userProfileQueries";
import { All_STATUSES } from "../status/statusQueries";
import { ADD_FRIEND } from "../Friends/addFriendMutation";

import Header from "../Header/Header";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";

import CreateStatus from "../status/CreateStatus";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      padding: "10px",
    },
    title: {
      fontWeight: "bold",
      padding: "10px",
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    componentContainer: {
      border: "1px solid",
      borderColor:
        theme.palette.type === "light"
          ? "#0000001f !important"
          : "rgba(255, 255, 255, 0.12)",

      height: "100%",
    },
    inline: {
      display: "inline",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

export default function Status() {
  const classes = useStyles();

  const id = localStorage.getItem("user-id");

  const user = useQuery(USER_PROFILE, { variables: { id } });

  const [friend, friendResult] = useMutation(ADD_FRIEND, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAddFriend = (id: string) => {
    console.log(id + "id");
    friend({ variables: { id: id } });
  };

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Friends"} />
      {user.data.getUserInfo.friends.map((friend: any) => (
        <Typography className={classes.title} variant="h5">
          {friend}
        </Typography>
      ))}
    </Container>
  );
}
