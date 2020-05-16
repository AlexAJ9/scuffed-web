import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { UPDATE } from "../status/statusMutations";
import { All_STATUSES } from "../status/statusQueries";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
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
    box: {
      padding: "30px",
      borderBottom: "solid 1px",
      borderTop: "solid 1px",
      borderColor: "#e8d6d6 !important",
    },
    content: {
      display: "flex",
    },
    itemEnd: {
      display: "flex",
      justifyContent: "flex-end",
      flex: 2,
    },
    flexItem: {
      margin: "10px",
    },
  })
);
interface Props {
  id: string;
  text: string;
}
export default function DeleteDialog({ id, text }: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [statusText, setStatusText] = useState(text);

  const [update, result] = useMutation(UPDATE, {
    refetchQueries: [{ query: All_STATUSES }],
    onError: (error) => {
      console.log(error);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    update({
      variables: {
        id: id,
        status_text: statusText,
      },
    });

    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Update post</DialogTitle>
        <Container className={classes.box}>
          <form noValidate autoComplete="off">
            <div className={classes.content}>
              <Avatar
                className={classes.flexItem}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <TextField
                className={classes.flexItem}
                fullWidth
                value={statusText}
                onChange={({ target }) => setStatusText(target.value)}
                id="outlined-textarea"
                placeholder="What's happening?"
                multiline
              />
            </div>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </Container>
      </Dialog>
    </>
  );
}
