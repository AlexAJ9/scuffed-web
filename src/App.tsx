import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login/Login";
import Status from "./components/status/Status";
import Register from "./components/Register/Register";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
function App() {
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
    <Switch>
      <ProtectedRoute token={token} exact path="/" Component={Status} />
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
      {/* <Status /> */}
    </Switch>
  );
}

export default App;
