import { gql } from "@apollo/client";

export const CREATE_STATUS = gql`
  mutation addStatus($status_text: String!, $status_picture_url: String!) {
    addStatus(
      status_text: $status_text
      status_picture_url: $status_picture_url
    ) {
      status_text
      status_picture_url
    }
  }
`;
