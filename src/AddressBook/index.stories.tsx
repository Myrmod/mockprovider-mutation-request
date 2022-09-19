import { MockedProviderProps } from '@apollo/client/testing';
import { ComponentMeta } from '@storybook/react';
import { AddressBook } from './index';
import {
    CREATE_CUSTOMER_ADDRESS,
    DELETE_CUSTOMER_ADDRESS,
    GET_CUSTOMER,
    UPDATE_CUSTOMER_ADDRESS
} from './query/customer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AddressBook',
    component: AddressBook,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof AddressBook>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate = () => {
    return <AddressBook />;
};

export const Default = DefaultTemplate.bind({});

const apolloClient: MockedProviderProps = {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    addTypename: false,
    mocks: [
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
                query: CREATE_CUSTOMER_ADDRESS
            }
        },
        {
            request: {
                query: UPDATE_CUSTOMER_ADDRESS,
                variables: {
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
                }
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
    ]
};

Default.parameters = {
    apolloClient
};
