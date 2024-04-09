import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCaegories {
    categories {
      id
      title
      image
    }
  }`