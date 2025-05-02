import * as yup from "yup";

export const useOrderValidationSchema = (openBillingAddress, paymentType) => {

    return yup.object().shape({
        ...(paymentType === "CREDIT_CARD"
            ? {
                paymentCard: yup.object().shape({
                    cardHolderName: yup
                        .string()
                        .required(),
                    cardNumber: yup
                        .string()
                        .required(),
                    expireMonth: yup
                        .string()
                        .required(),
                    expireYear: yup
                        .string()
                        .required(),
                    cvc: yup
                        .string()
                        .required(),
                }),
            }
            : {}),
        buyer: yup.object({
            name: yup.string().required(),
            surname: yup.string().required(),
            gsmNumber: yup.string().required(),
            email: yup
                .string()
                .email()
                .required(),
        }),
        shippingAddress: yup.object({
            city: yup.string().required(),
            state: yup.string().required(),
            address: yup.string().required(),
            street: yup
                .string()
                .required(),
        }),
        ...(openBillingAddress
            ? {
                billingAddress: yup.object({
                    city: yup.string().required(),
                    state: yup
                        .string()
                        .required(),
                    address: yup
                        .string()
                        .required(),
                    street: yup
                        .string()
                        .required(),
                }),
            }
            : {}),
    });
};