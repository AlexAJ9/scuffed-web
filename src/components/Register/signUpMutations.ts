import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
    }
  }
`;
