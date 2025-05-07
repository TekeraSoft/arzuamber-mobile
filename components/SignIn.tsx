import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import TextCustom from "@/components/utils/TextCustom";
import {color} from "@/constants/colors";
import {useAuth} from "@/context/AuthContext";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {changeAuthModal} from "@/store/generalSlice";
import {useFormik} from "formik";
import {useLoginValidationSchema} from "@/error/loginSchema";
import FormInput from "@/components/FormInput";

function SignIn() {
    const dispatch = useDispatch<AppDispatch>();
    const {signIn} = useAuth()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: useLoginValidationSchema(),
        onSubmit: (values) => {
            signIn(values)
        }
    })

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':'height'} style={styles.container}>
            <View>
                <View className={'flex flex-col gap-y-2 w-full items-center justify-center'} style={{marginTop:-36,marginBottom:32}}>
                    <Text className={'text-center font-bold'} style={{fontSize:40,color:color.mainColor,fontStyle:'italic'}}>Giriş Yap</Text>

                    <Text style={{fontStyle:'italic',color:color.mainColorDark}}>
                        Bilgileri görüntülemek için giriş yapınız
                    </Text>
                </View>

                <FormInput name={'email'} formik={formik} placeholderName={'Email'} />
                <FormInput name={'password'} formik={formik} secureTextEntry placeholderName={'Parola'} />

                <TouchableOpacity style={{backgroundColor: color.mainColor,padding: 12,
                    borderRadius: 6,
                    alignItems: "center",
                    marginTop: 10,}} onPress={()=> formik.handleSubmit()}>
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>
                <View className={'flex flex-row items-center gap-x-1 mt-6 justify-center'}>

                        <Text className={'text-gray-600 text-lg'}>Üye değil misiniz ?</Text>
                    <TouchableOpacity onPress={()=> dispatch(changeAuthModal())} className={'p-1.5 rounded-lg px-3'}>
                        <Text className={'text-lg text-blue-600'}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    headline: {
        color: color.mainColor,
        textAlign: "center",
        marginTop: -100,
        marginBottom: 50,
        fontWeight: 700,
        fontStyle: "italic",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,

        marginTop: 10,
        marginBottom: 10,
        borderColor: "grey",
    },
    button: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});
