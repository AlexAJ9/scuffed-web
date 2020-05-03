import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login/Login";
import Status from "./components/status/Status";
import Profile from "./components/Profile/UserProfile";
import Register from "./components/Register/Register";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    text: {
      fontWeight: "bolder",
      fontSize: "18px",
    },
  })
);

function App() {
  const classes = useStyles();

  const [token, setToken] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    console.log(JSON.stringify(localStorage.getItem("user-token")));
    setToken(localStorage.getItem("user-token"));
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };
  return (
    <>
      <Switch>
        <ProtectedRoute token={token} exact path="/" Component={Status} />
        <ProtectedRoute
          token={token}
          exact
          path="/profile"
          Component={Profile}
        />
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              setToken={setToken}
              token={token}
              setErrorMessage={setErrorMessage}
            />
          )}
        />

        <Route
          exact
          path="/register"
          component={() => (
            <Register token={token} setErrorMessage={setErrorMessage} />
          )}
        />
        <Route component={Register} />

        <button onClick={logout}>logout</button>
      </Switch>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link
            style={{
              textDecoration: "none",
              color: "#1da1f2",
            }}
            to="/"
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.text}>Home</Typography>}
              />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            style={{
              textDecoration: "none",
              color: "#1da1f2",
            }}
            to="/profile"
          >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Profile</Typography>
                }
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}

export default App;
