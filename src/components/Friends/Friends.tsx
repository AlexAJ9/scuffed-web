import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useQuery, useMutation } from "@apollo/client";

import { USER_PROFILE } from "../Profile/userProfileQueries";
import { ALL_USERS } from "./friendsQuery";
import { ADD_FRIEND } from "../Friends/addFriendMutation";

import Header from "../Header/Header";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
      borderColor: "#25a9f066",

      height: "100vh",
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
  const { enqueueSnackbar } = useSnackbar();
  const id = localStorage.getItem("user-id");

  const user = useQuery(USER_PROFILE, { variables: { id } });
  const friends = useQuery(ALL_USERS);
  const [friend, friendResult] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: ALL_USERS }],
    onCompleted: (data) => {
      console.log(data);

      enqueueSnackbar(`Успешно премахна приятел!`, {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar("Възникна проблем. Пробвайте отновo!", {
        variant: "error",
      });
    },
  });

  const handleRemoveFriend = (id: string) => {
    friend({ variables: { id: id } });
  };

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Приятели"} />
      <Typography className={classes.title} variant="h4">
        Брой последвани {user.data?.getUserInfo.friends.length}
      </Typography>
      {user.data?.getUserInfo.friends.map((friend: any) =>
        friends.data?.allUsers.map((user: any) =>
          user.id === friend ? (
            <>
              <div style={{ display: "flex" }}>
                <Typography className={classes.title} variant="h5">
                  {user.username}
                </Typography>
                <div className={classes.title} style={{ marginTop: "6px" }}>
                  {user.friends.length} приятели
                </div>
              </div>
              <Chip
                style={{ color: "#fff" }}
                label="Премахни от приятели"
                onClick={() => {
                  handleRemoveFriend(user.id);
                }}
                color="primary"
              />

              {user.friends.includes(id) ? (
                <div style={{ marginLeft: "5px" }}>
                  <p>Следава те 🎉</p>
                </div>
              ) : (
                <div style={{ marginLeft: "5px" }}>
                  <p>Не те следва 🤷‍♀</p>
                </div>
              )}
            </>
          ) : (
            <></>
          )
        )
      )}
    </Container>
  );
}
