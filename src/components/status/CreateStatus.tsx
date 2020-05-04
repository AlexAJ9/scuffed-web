import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_STATUS } from "./statusMutations";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
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
export default function CreateStatus() {
  const classes = useStyles();
  const [image, setImage] = useState<File>();
  const [status_text, setStatusText] = useState("");

  const [create, _result] = useMutation(CREATE_STATUS, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (image !== undefined) formData.append("file", image);
    formData.append("upload_preset", "pxs3cjzn");

    let response = null;
    if (image)
      response = await axios.post(
        `https://api.cloudinary.com/v1_1/alexaaj/image/upload`,
        formData
      );

    create({
      variables: {
        status_text: status_text,
        status_picture_url: response?.data.url,
      },
    });
  };
  return (
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
            value={status_text}
            onChange={({ target }) => setStatusText(target.value)}
            id="outlined-textarea"
            placeholder="What's happening?"
            multiline
          />
        </div>
        <div className={classes.content}>
          <input
            onChange={({ target }) =>
              target.files ? setImage(target.files[0]) : null
            }
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <CloudUploadIcon />
            </IconButton>
          </label>
          <div className={classes.itemEnd}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}