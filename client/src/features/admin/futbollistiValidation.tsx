import * as yup from 'yup';

export const validationSchema = yup.object({
    Emri: yup.string().required(), // Use 'Emri' instead of 'emri'
    Skuadra: yup.string().required(), // Use 'Skuadra' instead of 'Skuadra'
});
