import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  PaperProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

import { FormDialog } from "../../components/FormDialog";
import { useCountries } from "../../hooks";
import { GET_CUSTOMER, UPDATE_CUSTOMER_ADDRESS } from "../../query";
import { AddressForm } from "./AddressForm";

export interface AddressItemProps extends PaperProps {
  address: CustomerAddress;
}

export const AddressItem: FC<AddressItemProps> = ({ address, ...props }) => {
  const { id, ...input } = address;
  const [open, setOpen] = useState(false);
  const { countries } = useCountries("de");

  const [updateAddress, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CUSTOMER_ADDRESS, {
      refetchQueries: [{ query: GET_CUSTOMER }],
      awaitRefetchQueries: true,
    });

  const handleSubmit = (input: CustomerAddressInput) => {
    updateAddress({ variables: { id, input } }).then(() => {
      setOpen(false);
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formId = `form-address-${id}`;

  return (
    <Paper className="address-list-item" {...props}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {address.default_shipping && (
            <Box
              sx={{
                borderColor: "grey.500",
                border: 1,
                px: 2,
                py: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Standard</Typography>
            </Box>
          )}
        </Box>
        <Box>
          <IconButton onClick={handleOpen} data-testid="edit-button">
            <EditIcon />
          </IconButton>
          {!address.default_shipping && (
            <IconButton onClick={handleDeleteOpen} data-testid="delete-button">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ py: 2, px: 3 }}>
        <div>
          <div>
            {input.firstname} {input.lastname}
          </div>
          <div>{input.street}</div>
          <div>
            {input.postcode} {input.city}
          </div>
          <div>
            {countries.find(({ code }) => input.country_code === code)?.name}
          </div>
          {!!input.telephone && (
            <div>
              <a href={`phone:${input.telephone}`}>{input.telephone}</a>
            </div>
          )}
        </div>
      </Box>
      <FormDialog
        title="Adresse bearbeiten"
        open={open}
        onCancel={handleClose}
        form={formId}
        cancelLabel="Abbrechen"
        confirmLabel="Speichern"
        loading={updateLoading}
      >
        <AddressForm
          onSubmit={handleSubmit}
          id={formId}
          address={address}
          disabled={updateLoading}
        />
        {updateError && <p>Error: {updateError.message}</p>}
      </FormDialog>
    </Paper>
  );
};
