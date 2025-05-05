import * as yup from "yup";

export const contactErrorSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().min(15).max(300).required(),
})