import React from "react";
import { Route, Redirect } from "react-router-dom";
interface Props {
  Component: () => JSX.Element;
  token: string | null;
  exact: boolean;
  path: string;
}

export const ProtectedRoute = ({ Component, token, exact, path }: Props) => (
  <Route
    {...console.log(token)}
    exact={exact}
    path={path}
    render={(props) =>
      token !== null ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
