import * as Yup from "yup";

export const useRegisterValidationSchema = () => {

    return Yup.object({
        name: Yup.string()
            .min(2)
            .max(50)
            .required(),
        surname: Yup.string()
            .min(2)
            .max(50)
            .required(),
        email: Yup.string()
            .email() // Genel e-posta formatı doğrulaması
            .required()

            .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
            ),
        password: Yup.string()
            .min(6)
            .required()
            .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir.')
            .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir.')
            .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir.')
            .matches(/[\W_]/, 'Şifre en az bir özel karakter içermelidir.'),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")],'Parolalar eşleşmiyor')
            .required(),
    });
};
