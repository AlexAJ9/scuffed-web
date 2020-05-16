import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
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
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    margin: "10px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignIitems: "center",
    marginTop: "300px",
  },
}));

interface Props {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function SignIn({ setToken, setErrorMessage, token }: Props) {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 20000000);
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      setToken(token);
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", result.data.login.user.id);
    }
  }, [result.data, setToken]);

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {loader ? (
        <div className={classes.loader}>
          <Loader type="TailSpin" color="#1da1f2" height={80} width={80} />
        </div>
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  value={username}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
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
                  label="Password"
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
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/register">"Don't have an account? Sign Up"</Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
