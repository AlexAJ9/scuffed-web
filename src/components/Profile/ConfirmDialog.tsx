import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import { All_STATUSES } from "../status/statusQueries";
import { DELETE_STATUS } from "../status/statusMutations";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

interface Props {
  id: string;
}
export default function DeleteDialog({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const [remove, result] = useMutation(DELETE_STATUS, {
    refetchQueries: [{ query: All_STATUSES }],
    onCompleted: (data) => {
      enqueueSnackbar(`Успешно изтрихте публикация! 👀`, {
        variant: "success",
      });
    },
    onError: (error) => {
      //   console.log(error);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteStatus = (id: string) => {
    remove({ variables: { id: id } });
    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteForeverIcon color="secondary" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Изтриване на публикация
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете тази публикация?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отказ
          </Button>
          <Button onClick={() => deleteStatus(id)} color="primary">
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
