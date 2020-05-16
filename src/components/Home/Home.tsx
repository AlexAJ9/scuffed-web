import React from "react";

import { useQuery } from "@apollo/client";

import { All_STATUSES } from "../status/statusQueries";

import Header from "../Header/Header";
import SingleStatus from "../status/SingleStatus";

import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import CreateStatus from "../status/CreateStatus";
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

  const all_statuses = useQuery(All_STATUSES);

  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Home"} />
      <CreateStatus />
      {all_statuses.data.allStatuses.map((x: any) => (
        <SingleStatus status={x} />
      ))}
    </Container>
  );
}
