import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login/Login";
import Status from "./components/status/Status";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/UserProfile";
import Settings from "./components/ProfileSettings/ProfileSettings";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    link: {
      all: "unset",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
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

const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#15202b",
      paper: "#15202b",
    },
    text: {
      primary: "#fff",
      secondary: "#1da1f2",
    },
    primary: {
      main: "#1da1f2",
    },
    secondary: {
      main: "#e0245e",
    },
    type: "dark",
  },
});
const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#000000",
      secondary: "#1da1f2",
    },
    secondary: {
      main: "#e0245e",
    },

    primary: {
      main: "#1da1f2",
    },
    type: "light",
  },
});
function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(lightTheme);
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
  const handleChangeTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Switch>
          <ProtectedRoute token={token} exact path="/" Component={Status} />
          <ProtectedRoute
            token={token}
            exact
            path="/friends"
            Component={Status}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/settings"
            Component={Settings}
          />
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
            <ListItem button>
              <Link to="/" className={classes.link}>
                <ListItemIcon>
                  <IconButton>
                    <HomeIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.text}>Home</Typography>
                  }
                />
              </Link>
            </ListItem>
          </List>

          <List>
            <ListItem className={classes.root} button>
              <Link className={classes.link} to="/profile">
                <ListItemIcon>
                  <IconButton>
                    <PersonIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.text}>Profile</Typography>
                  }
                />
              </Link>
            </ListItem>
            <ListItem className={classes.root} button>
              <Link className={classes.link} to="/friends">
                <ListItemIcon>
                  <IconButton>
                    <PeopleOutlineOutlinedIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.text}>Friends</Typography>
                  }
                />
              </Link>
            </ListItem>
            <ListItem className={classes.root} button>
              <Link className={classes.link} to="/profile">
                <ListItemIcon>
                  <IconButton>
                    <FavoriteBorderIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.text}>Likes</Typography>
                  }
                />
              </Link>
            </ListItem>

            <ListItem onClick={handleChangeTheme} button>
              <ListItemIcon>
                <IconButton>
                  <WbIncandescentOutlinedIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Display</Typography>
                }
              />
            </ListItem>
            <ListItem className={classes.root} button>
              <Link className={classes.link} to="/settings">
                <ListItemIcon>
                  <IconButton>
                    <SettingsIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.text}>Settings</Typography>
                  }
                />
              </Link>
            </ListItem>
            <ListItem onClick={logout} button>
              <ListItemIcon>
                <IconButton>
                  <ExitToAppOutlinedIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Log out</Typography>
                }
              />
            </ListItem>
          </List>
        </Drawer>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
