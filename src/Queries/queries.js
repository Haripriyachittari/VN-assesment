import { gql } from "@apollo/client";

// Define a GraphQL query to get all profiles with pagination, ordering, and searching
const GET_ALL_PROFILES = gql`
  query GetAllProfiles(
    $orderBy: globalOrderBy
    $searchString: String
    $rows: Int
    $page: Int
  ) {
    getAllProfiles(
      orderBy: $orderBy
      searchString: $searchString
      rows: $rows
      page: $page
    ) {
      size
      profiles {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  }
`;

const CREATE_PROFILE = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    createProfile(
      first_name: $firstName
      last_name: $lastName
      email: $email
      is_verified: $isVerified
      image_url: $imageUrl
      description: $description
    ) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

const GET_PROFILE_BY_ID = gql`
  query GetProfileById($getProfileByIdId: String!) {
    getProfileById(id: $getProfileByIdId) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $updateProfileId: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    updateProfile(
      id: $updateProfileId
      first_name: $firstName
      last_name: $lastName
      email: $email
      is_verified: $isVerified
      image_url: $imageUrl
      description: $description
    ) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

const DELETE_PROFILE = gql`
  mutation DeleteProfile($deleteProfileId: String!) {
    deleteProfile(id: $deleteProfileId)
  }
`;

export {
  GET_ALL_PROFILES,
  CREATE_PROFILE,
  GET_PROFILE_BY_ID,
  UPDATE_PROFILE,
  DELETE_PROFILE,
};
