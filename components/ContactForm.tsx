import React from 'react';
import {Text, View} from 'react-native';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {createContactDispatch} from "@/store/userSlice";
import FormInput from "@/components/FormInput";

function ContactForm() {

    const dispatch = useDispatch();
    const {loading} = useSelector((state: RootState) => state);

    const _handleSubmit = (values, {resetForm}) => (
        dispatch(createContactDispatch(values, resetForm))
    )

    // @ts-ignore
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            message: ''
        },
        onSubmit: _handleSubmit,
    })

    return (
        <View className={'mx-4 flex-col mt-4'}>
            <View className={'flex flex-row gap-x-2 items-center justify-between'}>
                <FormInput name={'name'} formik={formik} placeholderName={'Ad'} containerStyle={{flex: 1}} />
                <FormInput name={'surname'} formik={formik} placeholderName={'Soyad'} containerStyle={{flex: 1}} />
            </View>
            <FormInput name={'email'} formik={formik} placeholderName={'E-mail'} containerStyle={{flex: 1}} />
        </View>
    );
}

export default ContactForm;