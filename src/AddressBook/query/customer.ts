import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  {
    customer {
      firstname
      lastname
      addresses {
        id
        firstname
        lastname
        postcode
        street
        city
        country_code
        telephone
        default_shipping
      }
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress($id: String!, $input: CustomerAddressInput!) {
    updateCustomerAddress(id: $id, input: $input) {
      id
    }
  }
`;
