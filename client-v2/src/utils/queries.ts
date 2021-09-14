import { gql } from "@apollo/client";

export const CREATE_NEW_PRODUCT = gql`
  mutation CreateAProduct($name: String!) {
    createAProduct(name: $name)
  }
`;

export const NEW_PRODUCT_ADDED_SUB = gql`
  subscription {
    newProductAdded {
      id
      name
      timestamp
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      ratings {
        content
        rating
        timestamp
      }
      timestamp
    }
  }
`;

export const GET_A_PRODUCT = gql`
  query GetAProduct($productId: Float!) {
    getAProduct(productId: $productId) {
      id
      name
      timestamp
    }
  }
`;

// Ratings

export const GET_ALL_RATINGS_OF_A_PRODUCT = gql`
  query GetAllRatingsOfAProduct($productId: Float!) {
    getAllRatingsOfAProduct(productId: $productId) {
      product {
        id
        name
        timestamp
      }
      content
      rating
      timestamp
    }
  }
`;

export const CREATE_NEW_RATING = gql`
  mutation CreaetNewRating(
    $productId: Float!
    $content: String!
    $rating: Float!
  ) {
    createARating(productId: $productId, content: $content, rating: $rating)
  }
`;

export const NEW_RATING_ADDED_SUB = gql`
  subscription newRatingAdded($productId: Float!) {
    newRatingAdded(id: $productId) {
      content
      rating
      timestamp
    }
  }
`;
