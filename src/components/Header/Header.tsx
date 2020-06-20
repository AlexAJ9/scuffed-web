import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  title: {
    fontWeight: "bolder",
  },
  container: {
    padding: "10px",
    marginBottom: "50px",
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
      <Divider
        style={{ backgroundColor: "#fc06697d", height: "2px" }}
        variant="middle"
      />
    </div>
  );
}
