import {Stack, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import './globals.css'
import {Provider, useDispatch} from "react-redux";
import Toast from "react-native-toast-message";
import {I18nextProvider} from "react-i18next";
import i18n from "@/i18n";
import {color} from "@/constants/colors";
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import {store} from "@/store/store";
import Cart from "@/components/utils/Cart";
import {toastConfig} from "@/config/toastConfig";
import {clearCart} from "@/store/cartSlice";
import * as Font from 'expo-font';
import Card from "@/components/product/Card";

export default function RootLayout() {

    const path = useLocalSearchParams()
    const navigation = useNavigation();
    const router = useRouter();

  return (
      <GestureHandlerRootView>
      <Provider store={store}>
          <StatusBar translucent={true} backgroundColor={color.mainColor} />
          <I18nextProvider i18n={i18n}>
            <Stack>

                <Stack.Screen name="(tabs)" options={{headerShown:false}} />

                <Stack.Screen name={"detail/[slug]"} options={{
                    headerTitle:'Ürün Detayı',
                    headerBackTitleVisible: false,
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:(props) => (
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <Ionicons name="chevron-back-outline" size={32} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: (props) => (
                        <Cart />
                    )
                }} />

                <Stack.Screen name="cart/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: "",
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:() => (
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <Ionicons name="chevron-back-outline" size={32} color="white" />
                        </TouchableOpacity>
                    )
                }} />

                <Stack.Screen name="order-success/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: "",
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
                    headerBackTitle: "",
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:() => (
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <Ionicons name="chevron-back-outline" size={32} color="white" />
                        </TouchableOpacity>
                    )
                }} />

                <Stack.Screen name="payment/index" options={{
                    headerTitle:'Sepetiniz',
                    headerBackTitle: "",
                    headerTitleAlign:'center',
                    headerTintColor:'white',
                    headerStyle:{backgroundColor: color.mainColor},
                    headerLeft:() => (
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
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
  )
}
