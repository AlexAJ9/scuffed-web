import { gql } from "@apollo/client";

export const All_STATUSES = gql`
  query {
    allStatuses {
      id
      comments {
        text
        user
      }
      created_at
      userId
      username
      status_text
      status_picture_url
      likes
    }
  }
`;

export const FIND_STATUS = gql`
  query {
    findStatus(id: "5e776d4e5b8ff61470fa7d0f") {
      id
    }
  }
`;
