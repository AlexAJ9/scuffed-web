import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query getUserInfo($id: String!) {
    getUserInfo(id: $id) {
      id
      username
    }
  }
`;
