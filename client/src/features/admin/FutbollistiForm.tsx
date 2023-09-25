import { Box, Paper, Typography, Grid, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm, Control } from "react-hook-form";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { setFutbollisti } from "../futbollisti/futbollistiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./futbollistiValidation";
import useFutbollisti from "../../app/hooks/useFutbollisti";
import { Footballer } from "../../app/models/futbollisti";

interface Props {
    futbollisti?: Footballer;
    cancelEdit: () => void;
    updateList: () => void;
}

export default function FutbollistiForm({ futbollisti, cancelEdit, updateList }: Props) {
    const {
        control,
        reset,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = useForm<Footballer>({
        resolver: yupResolver(validationSchema),
        defaultValues: futbollisti ?? {
            id: 0,
            emri: "",
            skuadra: "",
        },
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (futbollisti && !isDirty) {
            reset(futbollisti);
        }
    }, [futbollisti, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Footballer;

            if (futbollisti) {
                // Update existing Futbollisti
                response = await agent.Admin.updateFutbollisti(data);
            } else {
                // Create a new Futbollisti
                response = await agent.Admin.createFutbollisti(data);
            }

            // Dispatch the updated or newly created Futbollisti to the Redux store
            dispatch(setFutbollisti(response));

            // Trigger list update to display changes
            updateList();

            // Reset the form and exit edit mode
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Futbollisti Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            {...(control as Control<Footballer>)}
                            variant="outlined"
                            fullWidth
                            label="Emri"
                            name="emri"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            {...(control as Control<Footballer>)}
                            variant="outlined"
                            fullWidth
                            label="Skuadra"
                            name="skuadra"
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant="contained" color="inherit">
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    );
}
