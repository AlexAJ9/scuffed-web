import { gql } from "@apollo/client";

export const LIKE = gql`
  mutation likeStatus($id: String!) {
    likeStatus(id: $id) {
      id
      likes
    }
  }
`;
export const ADD_LIKE = gql`
  subscription {
    likeStatus {
      id
      status_text
      status_picture_url
      comments {
        user
        text
      }
      userId
      username
      likes
    }
  }
`;
