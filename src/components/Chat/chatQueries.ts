import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query {
    allUsers {
      id
      username
    }
  }
`;
export const MESSAGE_QUERY = gql`
  query {
    messages {
      id
      message
      senderUsername
      receiverUsername
      timestamp
      user {
        username
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation(
    $message: String!
    $senderUsername: String!
    $receiverUsername: String!
  ) {
    sendMessage(
      message: $message
      senderUsername: $senderUsername
      receiverUsername: $receiverUsername
    ) {
      message
      senderUsername
      receiverUsername
      id
      timestamp
      user {
        username
      }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      message
      senderUsername
      receiverUsername
      id
      timestamp
      user {
        username
      }
    }
  }
`;
