import { gql } from "@apollo/client";

export const STATUS_ADDED = gql`
  subscription {
    addStatus {
      status_text
      status_picture_url
    }
  }
`;
