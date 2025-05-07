import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import {color} from "@/constants/colors";
import TextCustom from "@/components/utils/TextCustom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {registerUserDispatch} from "@/store/authSlice";
import {useRegisterValidationSchema} from "@/error/registerErrorSchema";
import {changeAuthModal} from "@/store/generalSlice";
import FormInput from "@/components/FormInput";

function SignUp() {
    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            rePassword: "",
        },
        validationSchema: useRegisterValidationSchema(),
        onSubmit: (values, { resetForm }) => {
            dispatch(
                registerUserDispatch(values, resetForm)
            );
        },
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View className={'flex flex-col gap-y-2 w-full items-center justify-center'} style={{marginTop:-36,marginBottom:32}}>
                    <Text className={'text-center font-bold'} style={{fontSize:40,color:color.mainColor,fontStyle:'italic'}}>Kayıt Ol</Text>

                    <Text style={{fontStyle:'italic',color:color.mainColorDark}}>
                        Mobile özel kampanyalar için kayıt olun !
                    </Text>
                </View>

                <View className={'flex flex-row items-center gap-x-4'}>
                    <FormInput
                        name="name"
                        placeholderName="Ad"
                        formik={formik}
                        containerStyle={{ flex: 1 }}
                    />
                    <FormInput
                        name="surname"
                        placeholderName="Soyad"
                        formik={formik}
                        containerStyle={{ flex: 1 }}
                    />
                </View>

                <FormInput
                    name="email"
                    placeholderName="Mail"
                    formik={formik}
                />

                <View className={'flex flex-row items-center gap-x-4'}>
                    <FormInput
                        name="password"
                        placeholderName="Parola"
                        formik={formik}
                        containerStyle={{ flex: 1 }}
                        secureTextEntry
                    />
                    <FormInput
                        name="rePassword"
                        placeholderName="Parola Tekrar"
                        formik={formik}
                        containerStyle={{ flex: 1 }}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={{backgroundColor: color.mainColor,padding: 12,
                    borderRadius: 6,
                    alignItems: "center",
                    marginTop: 10,}} onPress={()=> formik.handleSubmit()}>
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>

                <View className={'flex flex-row items-center gap-x-1 mt-6 justify-center'}>

                    <Text className={'text-gray-600 text-lg'}>Zaten üye misiniz ?</Text>
                    <TouchableOpacity onPress={()=> dispatch(changeAuthModal())} className={'p-1.5 rounded-lg px-3'}>
                        <Text className={'text-lg text-blue-600'}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default SignUp;

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