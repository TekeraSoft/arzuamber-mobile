import {SplashScreen, Stack, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import './globals.css'
import {Provider} from "react-redux";
import Toast from "react-native-toast-message";
import {I18nextProvider} from "react-i18next";
import i18n from "@/i18n";
import {color} from "@/constants/colors";
import { StatusBar, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {store} from "@/store/store";
import Cart from "@/components/utils/Cart";
import {toastConfig} from "@/config/toastConfig";
import {AuthProvider} from "@/context/AuthContext";
import {WebView} from "react-native-webview";
import {Asset} from "expo-asset";

export default function RootLayout() {
    const [isAppReady, setIsAppReady] = useState(false);
    const path = useLocalSearchParams()
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        SplashScreen.hide()
        const timeout = setTimeout(() => {
            setIsAppReady(true);
        }, 3000); // 3 saniye splash screen

        return () => clearTimeout(timeout);
    }, []);

    if (!isAppReady) {
        // Asset yükleme
        const gifUri = Asset.fromModule(require('../assets/icons/arzuamber-logo-parlama.gif')).uri;

        return (
            <View style={styles.container}>
                <WebView
                    source={{
                        html: `
              <html style="margin:0;padding:0;">
                <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:#675B84;height:100vh;">
                  <img src="${gifUri}" style="width:100%;max-width:100%;height:1000px" />
                </body>
              </html>
            `,
                    }}
                    originWhitelist={['*']}
                    style={styles.webview}
                />
            </View>
        );
    }

    return (
      <AuthProvider>
      <GestureHandlerRootView>
      <Provider store={store}>
          <StatusBar backgroundColor={'transparent'} />
          <I18nextProvider i18n={i18n}>
            <Stack s>

                <Stack.Screen name="(tabs)" options={{headerShown:false}} />

                <Stack.Screen name={"detail/[slug]"} options={{
                    headerTitle:'Ürün Detayı',
                    headerBackButtonDisplayMode: 'minimal',
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerRight: (props) => (
                        <Cart />
                    )
                }} />

                <Stack.Screen name="cart/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: " ",
                    headerBackButtonDisplayMode: 'minimal',
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                }} />

                <Stack.Screen name="order-success/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: " ",
                    headerBackVisible: false,
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:() => (
                        <TouchableOpacity className={'border-white border p-1.5 rounded-lg'} onPress={()=> router.navigate('/')}>
                            <Text className={'text-white'}>Anasayfaya Dön</Text>
                        </TouchableOpacity>
                    )
                }} />

                <Stack.Screen name="order-failure/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: " ",
                    headerTitleAlign:'center',
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                }} />

                <Stack.Screen name="payment/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: "",
                    headerBackVisible: false,
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:() => (
                        <TouchableOpacity onPress={()=> router.back()}>
                            <Ionicons name="chevron-back-outline" size={32} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: (props) => (
                        <TouchableOpacity className={'p-1.5 rounded-lg border border-white'} onPress={()=> router.push('(tabs)/product')}>
                            <Text className={'text-white text-xs'}>Alışverişe Devam Et</Text>
                        </TouchableOpacity>
                    )
                }} />

            </Stack>
          <Toast config={toastConfig} />
          </I18nextProvider>
      </Provider>
      </GestureHandlerRootView>
      </AuthProvider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        backgroundColor: 'white',
    },
});
