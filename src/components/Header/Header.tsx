import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  title: {
    fontWeight: "bolder",
  },
  container: {
    padding: "10px",

    borderColor: "#0000001f",
  },
});
interface Props {
  title: string;
}
export default function Types({ title }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {title}
      </Typography>
    </div>
  );
}
