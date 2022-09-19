import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { FC, ReactNode } from 'react';

export interface FormDialogProps extends Omit<DialogProps, 'title'> {
    /**
     * Specify title
     */
    title?: ReactNode;
    /**
     * Controlled open state
     */
    open: boolean;
    /**
     * Provide reference to a form element by id
     */
    form?: string;
    /**
     * Specify label for cancel action
     */
    cancelLabel?: ReactNode;
    /**
     * Specify label for confirm action
     */
    confirmLabel?: ReactNode;
    /**
     * Provide callback for cancel action
     */
    onCancel?: () => void;
    /**
     * Provide callback for confirm action
     */
    onConfirm?: () => void;
    /**
     * Controlled loading state
     */
    loading?: boolean;
}

export const FormDialog: FC<FormDialogProps> = (props) => {
    const {
        open,
        form,
        title,
        children,
        onCancel,
        onConfirm,
        cancelLabel = 'Cancel',
        confirmLabel = 'Confirm',
        loading,
        maxWidth = 'md'
    } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth={maxWidth}
            fullScreen={fullScreen}
            fullWidth
            PaperProps={{
                sx: {
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    disabled={loading}
                    onClick={onCancel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading}
                >
                    {cancelLabel}
                </Button>
                <LoadingButton
                    color="primary"
                    onClick={onConfirm}
                    loading={loading}
                    variant="contained"
                    form={form}
                    type="submit"
                >
                    {confirmLabel}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
