import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import Loader from "../Loader/Loader";

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "./signUpMutations";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Ту-Варна © "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  paper: {
    background: "#fff",
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "25px",
    padding: "20px",
  },
  avatar: {
    margin: "10px",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
interface Props {
  token: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SignUp({ token, setErrorMessage }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [signUp, { loading: mutationLoading }] = useMutation(SIGN_UP, {
    onCompleted() {
      enqueueSnackbar("Успех! Вече имаш акаунт! 🙂", {
        variant: "success",
      });
    },
    onError(error) {
      enqueueSnackbar("Възникна проблем. Пробвайте отново!", {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signUp({ variables: { username, password } });
  };
  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.root}>
      {mutationLoading ? <Loader /> : null}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Typography component="h1" variant="h6">
            Много бързо и много лесно е.
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  variant="outlined"
                  required={true}
                  fullWidth
                  id="username"
                  label="Потребителско име"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  variant="outlined"
                  required={true}
                  fullWidth
                  name="password"
                  label="Парола"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Регистрация
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Вече имаш акаунт? Влез от тук! 👈
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Container>
    </div>
  );
}
