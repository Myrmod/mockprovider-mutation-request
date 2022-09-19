import { useQuery } from "@apollo/client";

import Grid from "@mui/material/Grid"; // Grid version 2
import { GET_CUSTOMER } from "../../query";
import { AddressItem } from "./AddressItem";

import { AddressListSkeleton } from "./AddressListSkeleton";

export const AddressList = () => {
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery<{ customer: Customer }>(GET_CUSTOMER);

  const addresses = data?.customer?.addresses;

  return !!addresses && !queryLoading ? (
    <div>
      {queryError ? (
        <p>Error: {queryError.message}</p>
      ) : (
        <Grid container spacing={2}>
          {addresses.map((address) => (
            <Grid key={address.id} xs={12} md={6} item>
              <AddressItem sx={{ height: "100%" }} address={address} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  ) : (
    <AddressListSkeleton />
  );
};
