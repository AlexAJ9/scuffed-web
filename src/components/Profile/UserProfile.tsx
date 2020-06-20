import React from "react";

import { useQuery } from "@apollo/client";

import { USER_PROFILE } from "./userProfileQueries";
import { All_STATUSES } from "../status/statusQueries";

import SingleStatus from "../status/SingleStatus";
import Header from "../Header/Header";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: "bold",
      padding: "10px",
    },
    componentContainer: {
      border: "1px solid",

      borderColor: "#25a9f066",

      height: "100vh",
    },
  })
);

export default function Status() {
  const classes = useStyles();

  const all_statuses = useQuery(All_STATUSES);
  const id = localStorage.getItem("user-id");
  const userId = useQuery(USER_PROFILE, { variables: { id } });

  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={`${userId?.data?.getUserInfo?.username}`} />

      <Typography variant="h5" gutterBottom className={classes.title}>
        Всички твой публикации 🌊
      </Typography>
      {all_statuses.data.allStatuses
        .filter((status: any) => status.userId === userId?.data?.getUserInfo.id)
        .map((x: any) => (
          <SingleStatus status={x} />
        ))}
    </Container>
  );
}
