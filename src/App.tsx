// importing stories into jest test
import { MockedProvider } from "@apollo/client/testing";
import { AddressBook } from "./AddressBook";
import {
  GET_CUSTOMER,
  UPDATE_CUSTOMER_ADDRESS,
} from "./AddressBook/query/customer";

const updatedAddress = {
  id: "lLo5Nlv7fg",
  input: {
    firstname: "John",
    lastname: "Doe",
    street: "John-Doe-Allee 1234",
    city: "Kalifornien",
    postcode: "24217",
    telephone: "01731234568",
    country_code: "DE",
  },
};

const mocks = [
  {
    request: {
      operationName: "getCustomerAddress",
      query: GET_CUSTOMER,
    },
    result: {
      data: {
        customer: {
          id: "hClP1WbPW",
          firstname: "John",
          lastname: "Doe",
          addresses: [
            {
              id: "lLo5Nlv7fg",
              firstname: "John",
              lastname: "Doe",
              street: "John-Doe-Allee 1234",
              city: "Kalifornien",
              postcode: "24217",
              country_code: "DE",
              telephone: "01731234567",
              default_shipping: true,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_CUSTOMER_ADDRESS,
      variables: updatedAddress,
    },
    result: {
      data: {
        updateCustomerAddress: {
          id: "lLo5Nlv7fg",
        },
      },
    },
  },
];

function App() {
  return (
    <div className="App">
      <MockedProvider addTypename={false} mocks={mocks}>
        <AddressBook />
      </MockedProvider>
    </div>
  );
}

export default App;
