import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import { useQuery, useMutation } from "@apollo/client";

import { EDIT_USER } from "./userProfileSettings";
import { USER_PROFILE } from "../Profile/userProfileQueries";

import Header from "../Header/Header";

import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
      margin: theme.spacing(1),
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

      height: "100vh",
    },
    inline: {
      display: "inline",
    },
    avatar: {
      display: "flex",
      justifyContent: "center",
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  })
);

export default function Status() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const id = localStorage.getItem("user-id");
  const user = useQuery(USER_PROFILE, { variables: { id } });

  const [username, setUsername] = useState(user.data?.getUserInfo.username);
  const [name, setName] = useState(user.data?.getUserInfo.name);
  const [avatar, setAvatar] = useState(
    user.data?.getUserInfo.profile_image_url
  );
  const [bio, setBio] = useState(user.data?.getUserInfo.description);
  const [image, setImage] = useState<File>();
  const [update, result] = useMutation(EDIT_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: id } }],
    onCompleted: (data) => {
      console.log(data);

      enqueueSnackbar(`Успешно обнови профила си! 💯`, {
        variant: "success",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    setUsername(user.data?.getUserInfo.username);
    setAvatar(user.data?.getUserInfo.profile_image_url);
    setName(user.data?.getUserInfo.name);
    setBio(user.data?.getUserInfo.description);
  }, [user]);

  const handleChange = (target: EventTarget & HTMLInputElement) => {
    if (target.files !== null) {
      var file = target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setAvatar(reader.result);
      };
      setAvatar(target.files[0]);
      setImage(target.files[0]);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    if (image !== undefined) formData.append("file", image);
    formData.append("upload_preset", "pxs3cjzn");

    let response = null;
    if (image) {
      response = await axios.post(
        `https://api.cloudinary.com/v1_1/alexaaj/image/upload`,
        formData
      );
      update({
        variables: {
          id: id,
          name: name,
          username: username,
          description: bio,
          profile_image_url: response?.data.url,
        },
      });
    } else
      update({
        variables: {
          id: id,
          name: name,
          username: username,
          description: bio,
          profile_image_url: avatar,
        },
      });
  };
  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Настройка на профил"} />

      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.avatar}>
          <IconButton>
            <input
              onChange={({ target }) => {
                handleChange(target);
              }}
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <Avatar
                className={classes.large}
                alt="Cindy Baker"
                src={avatar}
              />
            </label>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="outlined-basic"
            fullWidth
            label="Име"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="outlined-basic"
            fullWidth
            label="Потребителско име"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={bio}
            onChange={({ target }) => setBio(target.value)}
            id="outlined-multiline-static"
            label="Описание"
            fullWidth
            multiline
            rows={7}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Запази
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
