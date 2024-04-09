import { gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
        id
        name
        sku
        price
        description
        categoryID
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
mutation createCategory($input: CreateCategoryInput!){
    createCategory(input: $input){
        name
        image
    }
}
`;