import { gql } from "@apollo/client";

export const All_STATUSES = gql`
  query {
    allStatuses {
      status_text
      user
      id
      stars
    }
  }
`;

export const FIND_STATUS = gql`
  query {
    findStatus(id: "5e776d4e5b8ff61470fa7d0f") {
      status_text
    }
  }
`;
