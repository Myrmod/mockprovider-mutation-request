import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Controller, useForm } from 'react-hook-form';
import { useCountries } from '../../hooks';
import { addressSchema } from './schema';

export interface AddressFormProps
    extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    address?: CustomerAddress;
    onSubmit: (input: CustomerAddressInput) => void;
    disabled?: boolean;
}

export const AddressForm = ({
    onSubmit,
    address,
    disabled,
    ...props
}: AddressFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<CustomerAddressInput>({
        resolver: yupResolver(addressSchema)
    });
    const { countries } = useCountries('de');

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true} {...props}>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            disabled={disabled}
                            fullWidth
                            required
                            label="Vorname"
                            defaultValue={address?.firstname}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                            {...register('firstname')}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            disabled={disabled}
                            fullWidth
                            required
                            label="Nachname"
                            defaultValue={address?.lastname}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                            {...register('lastname')}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <FormControl fullWidth disabled={disabled}>
                            <InputLabel
                                id="address-country-select"
                                error={!!errors.country_code}
                            >
                                Land
                            </InputLabel>
                            <Controller
                                name="country_code"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        labelId="address-country-select"
                                        value={value}
                                        onChange={onChange}
                                        label="Land"
                                        error={!!errors.country_code}
                                        inputProps={{
                                            'data-testid': 'country_code'
                                        }}
                                    >
                                        {countries.map(({ name, code }) => (
                                            <MenuItem key={code} value={code}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                                defaultValue={address?.country_code || ''} // make sure to set up defaultValue
                            />
                            <FormHelperText error={!!errors.country_code}>
                                {errors.country_code?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <TextField
                            label="Adresse"
                            variant="outlined"
                            defaultValue={address?.street}
                            error={!!errors.street}
                            helperText={errors.street?.message}
                            fullWidth
                            required
                            disabled={disabled}
                            {...register('street')}
                            inputProps={{ 'data-testid': 'street' }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <TextField
                            label="Stadt"
                            variant="outlined"
                            defaultValue={address?.city}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                            fullWidth
                            required
                            disabled={disabled}
                            {...register('city')}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <TextField
                            label="Postleitzahl"
                            variant="outlined"
                            defaultValue={address?.postcode}
                            error={!!errors.postcode}
                            helperText={errors.postcode?.message}
                            fullWidth
                            required
                            disabled={disabled}
                            {...register('postcode')}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            label="Telefon"
                            variant="outlined"
                            defaultValue={address?.telephone}
                            error={!!errors.telephone}
                            helperText={errors.telephone?.message}
                            fullWidth
                            disabled={disabled}
                            {...register('telephone')}
                        />
                    </Grid>
                </Grid>
                {!address?.default_shipping && (
                    <Controller
                        control={control}
                        name="default_shipping"
                        defaultValue={!!address?.default_shipping}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                label="Als Standardadresse festlegen"
                                disabled={disabled}
                                control={
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                    />
                                }
                            />
                        )}
                    />
                )}
            </Box>
        </form>
    );
};
