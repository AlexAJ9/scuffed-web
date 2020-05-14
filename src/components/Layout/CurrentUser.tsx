import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { USER_PROFILE } from "../Profile/userProfileQueries";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      padding: "10px",
    },
    title: {
      fontWeight: "bold",
    },
    root: {
      margin: theme.spacing(1),
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
      height: "100vh",
    },
    inline: {
      display: "inline",
    },
    avatar: {
      display: "flex",
      justifyContent: "center",
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    text: {
      fontWeight: "bolder",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  })
);

export default function Status() {
  const classes = useStyles();
  const id = localStorage.getItem("user-id");
  const user = useQuery(USER_PROFILE, { variables: { id } });

  const [username, setUsername] = useState(user.data?.getUserInfo.username);
  const [avatar, setAvatar] = useState(
    user.data?.getUserInfo.profile_image_url
  );
  useEffect(() => {
    setUsername(user.data?.getUserInfo.username);
    setAvatar(user.data?.getUserInfo.profile_image_url);
  }, [user]);

  return (
    <Grid spacing={1} container>
      <Grid item xs={6} className={classes.avatar}>
        <IconButton>
          <Avatar className={classes.large} alt="Cindy Baker" src={avatar} />
        </IconButton>
      </Grid>
      <Grid className={classes.text} item xs={6}>
        <Typography className={classes.text} variant="h6" gutterBottom>
          {username}
        </Typography>
      </Grid>
    </Grid>
  );
}
