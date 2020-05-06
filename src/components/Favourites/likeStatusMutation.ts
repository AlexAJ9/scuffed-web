import { gql } from "@apollo/client";

export const LIKE = gql`
  mutation starStatus($id: String!) {
    starStatus(id: $id) {
      id
      stars
    }
  }
`;
