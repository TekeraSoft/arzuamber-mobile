import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import TextCustom from "@/components/utils/TextCustom";
import {color} from "@/constants/colors";
import {useAuth} from "@/context/AuthContext";

function SignIn() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {signIn} = useAuth()

    const handleSubmit = () => {
        signIn({email, password})
    }

    return (
        <View style={styles.container}>
            <View>
                <View className={'flex flex-col gap-y-2 w-full items-center justify-center'} style={{marginTop:-36,marginBottom:32}}>
                    <Text className={'text-center font-bold'} style={{fontSize:40,color:color.mainColor,fontStyle:'italic'}}>Giriş Yap</Text>

                    <Text style={{fontStyle:'italic',color:color.mainColorDark}}>
                        Bilgileri görüntülemek için giriş yapınız
                    </Text>
                </View>

                <TextCustom>Email:</TextCustom>
                <TextInput
                    placeholder="Enter your email..."
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextCustom>Password:</TextCustom>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity style={{backgroundColor: color.mainColor,padding: 12,
                    borderRadius: 6,
                    alignItems: "center",
                    marginTop: 10,}} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        padding: 10,

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
