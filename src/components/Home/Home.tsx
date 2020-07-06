import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { All_STATUSES } from "../status/statusQueries";
import Search from "../Search/Search";
import Header from "../Header/Header";
import SingleStatus from "../status/SingleStatus";
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

      height: "100%",
    },
    inline: {
      display: "inline",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
    searchBar: {
      top: "20px",
      right: "10px",
      width: "400px",
      position: "absolute",
      flexGrow: 1,
      borderRadius: " 10px",
    },
  })
);

export default function Status() {
  const classes = useStyles();

  const all_statuses = useQuery(All_STATUSES);
  const [filter, setFilter] = useState("");

  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Начало"} />

      <Typography variant="h5" gutterBottom className={classes.title}>
        Всички скорошни публикации 🌊
      </Typography>

      <Search filter={filter} setFilter={setFilter} />
      {all_statuses?.data.allStatuses
        .filter((x: any) =>
          filter !== ""
            ? x.status_text.toLowerCase().includes(filter.toLowerCase())
            : x
        )
        .map((x: any) => (
          <SingleStatus status={x} />
        ))}
    </Container>
  );
}
