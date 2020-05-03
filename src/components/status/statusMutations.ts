import { gql } from "@apollo/client";

export const CREATE_STATUS = gql`
  mutation addStatus($status_text: String!, $status_picture_url: String) {
    addStatus(
      status_text: $status_text
      status_picture_url: $status_picture_url
    ) {
      status_text
      status_picture_url
    }
  }
`;
export const DELETE_STATUS = gql`
  mutation deleteStatus($id: String!) {
    deleteStatus(id: $id) {
      id
    }
  }
`;

export const COMMENT = gql`
  mutation comment($id: String!, $comment: String!) {
    comment(id: $id, comment: $comment) {
      id
    }
  }
`;
export const UPDATE = gql`
  mutation editStatus($id: String!, $status_text: String) {
    editStatus(id: $id, status_text: $status_text) {
      id
    }
  }
`;
