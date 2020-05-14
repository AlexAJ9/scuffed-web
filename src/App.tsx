import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/UserProfile";
import Settings from "./components/ProfileSettings/ProfileSettings";
import Drawer from "./components/Layout/Drawer";
import NewDrawer from "./components/Layout/NewDrawer";
import CurrnetUser from "./components/Layout/CurrentUser";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
  const [theme, setTheme] = useState(lightTheme);
  const [token, setToken] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
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
          <ProtectedRoute token={token} exact path="/" Component={Home} />
          <ProtectedRoute
            token={token}
            exact
            path="/friends"
            Component={Home}
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
        {token ? (
          <>
            <Drawer handleChangeTheme={handleChangeTheme} logout={logout} />
            {/* <NewDrawer handleChangeTheme={handleChangeTheme} logout={logout} /> */}
          </>
        ) : (
          <></>
        )}
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
