import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
  mutation friendUser($id: String!) {
    friendUser(id: $id) {
      id
      friends
    }
  }
`;
