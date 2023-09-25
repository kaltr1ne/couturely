//FutbollistiForm.tsx in admin folder
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { setFutbollisti } from "../futbollisti/futbollistiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./futbollistiValidation";
import useFutbollisti from "../../app/hooks/useFutbollisti";
import { Footballer } from "../../app/models/futbollisti";

interface Props {
    futbollisti?: Footballer; // Replace with your Futbollisti model
    cancelEdit: () => void;
}

export default function FutbollistiForm({ futbollisti, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { emri, skuadra} = useFutbollisti();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (futbollisti && !isDirty) reset(futbollisti);
    }, [futbollisti, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Footballer;
            if (futbollisti) {  
                response = await agent.Admin.updateFutbollisti(data);
            } else {
                // Create a FormData object and append the form fields to it
                const formData = new FormData();
                formData.append("Id", data.Id);
                formData.append("Emri", data.Name);
                formData.append("Skuadra", data.Skuadra);
    
                response = await agent.Admin.createFutbollisti(formData);
            }
            dispatch(setFutbollisti(response));
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
                          <AppTextInput control={control} name='Id' label='Id' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <AppTextInput control={control} name='Name' label='Name' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <AppTextInput control={control} name='Skuadra' label='Skuadra' />
                      </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}