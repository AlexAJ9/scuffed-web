import React, { useState } from "react";

import Login from "./components/Login/Login";
import Status from "./components/status/Status";

function App() {
  const [token, setToken] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };
  return (
    <div className="App">
      <Login setToken={setToken} setErrorMessage={setErrorMessage} />
      <button onClick={logout}>logout</button>
      <Status />
    </div>
  );
}

export default App;
