import React, { useEffect } from "react";
import Image from "material-ui-image";
import { useQuery } from "@apollo/client";

import CreateStatus from "./CreateStatus";
import { All_STATUSES } from "./statusQueries";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      padding: "10px",
      border: "solid 1px",
      borderCcolor: "#e8d6d6",
    },
    title: {
      fontWeight: "bold",
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
    <Container maxWidth="sm">
      {all_statuses.data.allStatuses.map((x: any) => (
        <Paper className={classes.statusBox} elevation={3}>
          <Typography className={classes.title} variant="h5">
            {x.username}
          </Typography>
          <Typography variant="h6">{x.status_text}</Typography>
          {x.status_picture_url ? <Image src={x.status_picture_url} /> : <></>}
        </Paper>
      ))}
      <CreateStatus />
    </Container>
  );
}
