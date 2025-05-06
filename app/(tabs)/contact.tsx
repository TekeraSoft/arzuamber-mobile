import React from 'react';
import {Platform, Text, View} from 'react-native';
import MapScreen from "@/components/Map";
import {Entypo, Feather} from "@expo/vector-icons";
import {color} from "@/constants/colors";
import ContactForm from "@/components/ContactForm";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function Contact() {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            style={{backgroundColor:'white'}}
            keyboardOpeningTime={3}
            keyboardVerticalOffset={Platform.OS === 'android' ? 60 : 80}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
        <MapScreen />

          <View className={'flex flex-col gap-y-4 mx-4'}>
              <View className={"flex flex-row items-center justify-between mt-4"}>
                  <View className={"flex flex-col w-48 items-center justify-center border border-gray-300 bg-white p-3 rounded-lg"} style={{
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 5
                  }}>
                      <Feather name="phone-call" size={24} color={color.mainColor} />
                      <Text className={'text-xs'}>+90 (534) 260 8385</Text>
                  </View>

                  <View className={"flex flex-col p-3 w-48 items-center justify-center border border-gray-300 bg-white rounded-lg"} style={{
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 5
                  }}>
                      <Entypo name="mail" size={24} color={color.mainColor} />
                      <Text className={'text-xs'}>arzuambermoda@gmail.com</Text>
                  </View>
              </View>
             <View className={'flex items-center justify-center w-full'}>
                 <View className={"flex flex-col p-3 w-full items-center border border-gray-300 justify-center bg-white rounded-lg"} style={{
                     shadowOffset: { width: 0, height: 3 },
                     shadowOpacity: 0.1,
                     shadowRadius: 4,
                     elevation: 5
                 }}>
                     <Entypo name="address" size={24} color={color.mainColor} />
                     <Text className={'text-sm text-center'}>Kışla Mahallesi,
                         Cadde 40, Kayalar Apartmanı,
                         No: 8,Blok A, Kat: 4, Daire: 7
                         Antalya,Muratpaşa,Türkiye</Text>
                 </View>
             </View>
          </View>
          <ContactForm />
        </KeyboardAwareScrollView>
    );
}

export default Contact;