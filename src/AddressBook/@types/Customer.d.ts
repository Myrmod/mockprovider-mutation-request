declare type CustomerAddressRegionInput = {
    region_code: string;
    region: string;
};

declare type CustomerAddressInput = {
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    region: CustomerAddressRegionInput;
    postcode: string;
    country_code: string;
    telephone: string;
    default_shipping: boolean;
};

declare type CustomerAddress = CustomerAddressInput & {
    id: string;
};

declare type Customer = {
    firstname: string;
    lastname: string;
    suffix: string | null;
    email: string;
    addresses: CustomerAddress[];
};
