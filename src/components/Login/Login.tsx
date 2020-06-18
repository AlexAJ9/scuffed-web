import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import Loader from "../Loader/Loader";

import { useMutation } from "@apollo/client";
import { LOGIN } from "./loginMutation";

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
    padding: "30px",
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
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

interface Props {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function SignIn({ setToken, setErrorMessage, token }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data: result, loading: mutationLoading }] = useMutation(
    LOGIN,
    {
      onCompleted(data) {
        enqueueSnackbar(`Welcome ${data.login.user.username}!`, {
          variant: "success",
        });
      },
      onError(error) {
        enqueueSnackbar("Грешно име или парола. Пробвайте отновo!", {
          variant: "error",
        });
      },
    }
  );

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 20000000);
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result) {
      const token = result.login.token;
      setToken(token);
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", result.login.user.id);
    }
  }, [result, setToken]);

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      {mutationLoading ? <Loader /> : null}
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <form onSubmit={handleLogin} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                value={username}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Потребителско име"
                name="usernmae"
                autoComplete="username"
                autoFocus
                onChange={({ target }) => setUsername(target.value)}
              />
              <TextField
                variant="outlined"
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Парола"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Влез
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/register"
                  >
                    Нямаш акаунт? Регистрирай се! 😉
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
        </Container>
      </>
      )
    </div>
  );
}
