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
  mutation addComment($id: String!, $comment: String!) {
    addComment(id: $id, comment: $comment) {
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

export const STATUS_ADDED = gql`
  subscription {
    newStatus {
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
export const ADD_COMMENT = gql`
  subscription {
    addComment {
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
export const LIKE = gql`
  mutation likeStatus($id: String!) {
    likeStatus(id: $id) {
      id
      likes
    }
  }
`;
// export const ADD_LIKE = gql`
//   subscription {
//     likeStatus {
//       id
//       status_text
//       status_picture_url
//       comments {
//         user
//         text
//       }
//       userId
//       username
//       likes
//     }
//   }
// `;
