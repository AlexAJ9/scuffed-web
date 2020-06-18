import React, { useState } from "react";

import Loader from "react-loader-spinner";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "absolute",
    background: "  rgba(240,248,255,0.1)",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignIitems: "center",
    zIndex: 1000,
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loader}>
        <Loader type="TailSpin" color="#1da1f2" height={80} width={80} />
      </div>
    </div>
  );
}
