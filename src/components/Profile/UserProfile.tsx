import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { USER_PROFILE } from "./userProfileQueries";
export default function SimpleContainer() {
  const id = localStorage.getItem("user-id");
  const result = useQuery(USER_PROFILE, { variables: { id } });
  console.log(result);

  useEffect(() => {}, []);

  return (
    <Container maxWidth="sm">
      <Typography
        component="div"
        style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
      ></Typography>
    </Container>
  );
}
