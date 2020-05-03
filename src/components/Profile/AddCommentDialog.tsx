import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { COMMENT } from "../status/statusMutations";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  id: string;
  username: string;
  text: string;
}
export default function DeleteDialog({ id, username, text }: Props) {
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, result] = useMutation(COMMENT, {
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

  const handleComment = () => {
    comment({ variables: { id, comment: commentText } });
    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ReplyIcon fontSize="small" />
      </IconButton>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogTitle>Replying to {username}</DialogTitle>
          <DialogContentText>{text}</DialogContentText>
          <TextField
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            fullWidth
            id="outlined-textarea"
            label="Enter your reply"
            multiline
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleComment} color="primary">
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
