import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

export const AddressListSkeleton = () => (
    <>
        <Grid container spacing={2}>
            <Grid xs={12} md={6}>
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                />
                <Skeleton animation="wave" variant="rectangular" height={60} />
                <Skeleton variant="rounded" height={60} />
            </Grid>
            <Grid xs={12} md={6}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rounded" height={60} />
            </Grid>
        </Grid>
    </>
);
