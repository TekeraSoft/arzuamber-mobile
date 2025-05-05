import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {createContactDispatch} from "@/store/userSlice";
import FormInput from "@/components/FormInput";
import {color} from "@/constants/colors";
import {contactErrorSchema} from "@/error/contactErrorSchema";

function ContactForm() {

    const dispatch = useDispatch();
    const {loading} = useSelector((state: RootState) => state.user);

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
        validationSchema: contactErrorSchema,
        onSubmit: _handleSubmit,
    })

    return (
        <View className={'mx-4 flex-col mt-2'}>
            <View className={'flex flex-row gap-x-2 items-center justify-between'}>
                <FormInput name={'name'} formik={formik} placeholderName={'Ad'} containerStyle={{flex: 1}} />
                <FormInput name={'surname'} formik={formik} placeholderName={'Soyad'} containerStyle={{flex: 1}} />
            </View>
            <FormInput name={'email'} formik={formik} placeholderName={'E-mail'} />
            <FormInput name={'message'} formik={formik} placeholderName={'Mesaj'} multiline numberOfLines={4} />

            <View className={'flex justify-center items-center'}>
                <TouchableOpacity onPress={formik.handleSubmit} disabled={loading} style={{backgroundColor:color.mainColor}} className={'p-3 rounded-lg w-full'}>
                    <Text className={'text-xl text-white text-center'}>Gönder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ContactForm;