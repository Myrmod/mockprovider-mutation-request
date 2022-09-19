// importing stories into jest test
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddressBook } from '.';
import {
    CREATE_CUSTOMER_ADDRESS,
    DELETE_CUSTOMER_ADDRESS,
    GET_CUSTOMER,
    UPDATE_CUSTOMER_ADDRESS
} from './query/customer';

const newAddress = {
    id: 'lLo5Nlv7fg',
    input: {
        firstname: 'John',
        lastname: 'Doe',
        street: 'John-Doe-Allee 1234',
        city: 'Kalifornien',
        postcode: '24217',
        telephone: '01731234567',
        country_code: 'DE'
    }
};
const updatedAddress = {
    id: 'lLo5Nlv7fg',
    input: {
        firstname: 'John',
        lastname: 'Doe',
        street: 'John-Doe-Allee 1234',
        city: 'Kalifornien',
        postcode: '24217',
        telephone: '01731234568',
        country_code: 'DE'
    }
};

const mocks = [
    {
        request: {
            operationName: 'getCustomerAddress',
            query: GET_CUSTOMER
        },
        result: {
            data: {
                customer: {
                    id: 'hClP1WbPW',
                    firstname: 'John',
                    lastname: 'Doe',
                    addresses: [
                        {
                            id: 'lLo5Nlv7fg',
                            firstname: 'John',
                            lastname: 'Doe',
                            street: 'John-Doe-Allee 1234',
                            city: 'Kalifornien',
                            postcode: '24217',
                            country_code: 'DE',
                            telephone: '01731234567',
                            default_shipping: true
                        }
                    ]
                }
            }
        }
    },
    {
        request: {
            query: CREATE_CUSTOMER_ADDRESS,
            variables: newAddress
        }
    },
    {
        request: {
            query: UPDATE_CUSTOMER_ADDRESS,
            variables: updatedAddress
        },
        result: {
            data: {
                updateCustomerAddress: {
                    id: 'lLo5Nlv7fg'
                }
            }
        }
    },
    {
        request: {
            query: DELETE_CUSTOMER_ADDRESS
        }
    }
];

test('renders AddressBook', async () => {
    const { container, getByLabelText, getByTestId, getByText } = render(
        <MockedProvider addTypename={false} mocks={mocks}>
            <AddressBook />
        </MockedProvider>
    );

    // initial load
    await waitFor(() => {
        const addressItems =
            container.getElementsByClassName('address-list-item');
        expect(addressItems.length).toBe(1);
    });

    // adding a new address
    // open form
    const button = container.getElementsByClassName(
        'add-address'
    )[0] as HTMLButtonElement;

    fireEvent.click(button);

    // fill form
    fireEvent.change(getByLabelText(/Vorname/i), {
        target: { value: newAddress.input.firstname }
    });
    fireEvent.change(getByLabelText(/Nachname/i), {
        target: { value: newAddress.input.lastname }
    });
    fireEvent.change(getByTestId('country_code'), {
        target: { value: newAddress.input.country_code }
    });
    fireEvent.change(getByTestId('street'), {
        target: { value: newAddress.input.street }
    });
    fireEvent.change(getByLabelText(/Stadt/i), {
        target: { value: newAddress.input.city }
    });
    fireEvent.change(getByLabelText(/Postleitzahl/i), {
        target: { value: newAddress.input.postcode }
    });
    fireEvent.change(getByLabelText(/Telefon/i), {
        target: { value: newAddress.input.telephone }
    });
    fireEvent.click(getByText(/Speichern/i));

    await waitFor(() => {
        const addressItems =
            container.getElementsByClassName('address-list-item');
        expect(addressItems.length).toBe(2);
    });

    // editing new address
    fireEvent.click(getByTestId('edit-button'));
    fireEvent.change(getByLabelText(/Telefon/i), {
        target: { value: updatedAddress.input.telephone }
    });
    fireEvent.click(getByText(/Speichern/i));

    // deleting new address
    fireEvent.click(getByTestId('delete-button'));
    fireEvent.click(getByText(/Speichern/i));

    await waitFor(() => {
        const addressItems =
            container.getElementsByClassName('address-list-item');
        expect(addressItems.length).toBe(1);
    });
});
