import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

import { USER_PROFILE } from "../Profile/userProfileQueries";
import { All_STATUSES } from "./statusQueries";
import { CREATE_STATUS, STATUS_ADDED } from "./statusMutations";
// import { STATUS_ADDED } from "./statusSubscriptions";

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
  const client = useApolloClient();

  const id = localStorage.getItem("user-id");
  const user = useQuery(USER_PROFILE, { variables: { id } });

  const [image, setImage] = useState<File>();
  const [status_text, setStatusText] = useState("");
  const [username, setUsername] = useState(user.data?.getUserInfo.username);
  const [avatar, setAvatar] = useState(
    user.data?.getUserInfo.profile_image_url
  );

  useEffect(() => {
    setUsername(user.data?.getUserInfo.username);
    setAvatar(user.data?.getUserInfo.profile_image_url);
  }, [user]);

  const [create, _result] = useMutation(CREATE_STATUS, {
    onError: (error) => {
      console.log(error);
    },
  });

  const updateCacheWith = (addedStatus: any) => {
    const includedIn = (set: any, object: any) =>
      set.map((p: any) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: All_STATUSES });
    if (!includedIn(dataInStore.allStatuses, addedStatus)) {
      console.log(dataInStore.allStatuses);

      client.writeQuery({
        query: All_STATUSES,
        data: { allStatuses: dataInStore.allStatuses.concat(addedStatus) },
      });
    }
  };

  useSubscription(STATUS_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.newStatus);
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
          <Avatar className={classes.flexItem} alt="user" src={`${avatar}`} />
          <TextField
            className={classes.flexItem}
            fullWidth
            value={status_text}
            onChange={({ target }) => setStatusText(target.value)}
            id="outlined-textarea"
            placeholder={`What's happening, ${username}?`}
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
              variant="outlined"
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
