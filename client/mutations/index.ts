import { gql } from "@apollo/client/core";

export const poulateTableUsers = gql`
  mutation initUsers($input: [UserInput!]) {
    initUsers(users: $input)
  }
`;
export const poulateTableRequests = gql`
  mutation initRequests($input: [ReqInput!]) {
    initRequests(requests: $input)
  }
`;
export const poulateTableAddresses = gql`
  mutation initAddresses($input: [AddressInput!]) {
    initAddresses(addresses: $input)
  }
`;
export const unsafe = gql`
  mutation {
    unsafe
  }
`;
export const poulateTableUserprofiles = gql`
  mutation initUserProfiles($input: [UserProfileInput!]) {
    initUserProfiles(userProfiles: $input)
  }
`;
export const poulateTableShippingorders = gql`
  mutation initShippingOrders($input: [ShippingOrderInput!]) {
    initShippingOrders(ShippingOrders: $input)
  }
`;

export const poulateTablePaymenttrasnsactions = gql`
  mutation initPaymentTransactions($input: [PaymentTransactionInput!]) {
    initPaymentTransactions(paymentTransactions: $input)
  }
`;
