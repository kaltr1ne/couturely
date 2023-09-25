//futbollistiValidation.tsx in admin folder
import * as yup from 'yup';

export const validationSchema = yup.object({
    emri: yup.string().required(),
    Skuadra: yup.string().required()
})