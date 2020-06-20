import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { COMMENT } from "../status/statusMutations";
import { All_STATUSES } from "../status/statusQueries";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

interface Props {
  id: string;
  username: string;
  text: string;
}
export default function CommnetDialog({ id, username, text }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [comment, result] = useMutation(COMMENT, {
    refetchQueries: [{ query: All_STATUSES }],
    onCompleted: (data) => {
      enqueueSnackbar(`Успешно добавихте коментар!`, {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(`Грешка `, {
        variant: "error",
      });
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
      <Button onClick={handleClickOpen}>Кометирай</Button>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#25a9f0" }}>
            Напиши коментар на {username}.
          </p>
          <DialogContentText>
            {username} написа {text}.
          </DialogContentText>
          <TextField
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            fullWidth
            id="outlined-textarea"
            label="Въведи коментар тук..."
            multiline
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отказ
          </Button>
          <Button onClick={handleComment} color="primary">
            Отговор
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
