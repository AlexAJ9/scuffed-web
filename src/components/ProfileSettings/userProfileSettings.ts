import { gql } from "@apollo/client";

export const EDIT_USER = gql`
  mutation editUser(
    $id: String!
    $username: String!
    $name: String!
    $profile_image_url: String!
    $description: String!
  ) {
    editUser(
      id: $id
      username: $username
      name: $name
      profile_image_url: $profile_image_url
      description: $description
    ) {
      id
      username
    }
  }
`;
