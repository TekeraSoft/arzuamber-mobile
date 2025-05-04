import React from 'react';
import {Text, View} from 'react-native';
import MapScreen from "@/components/Map";
import {Entypo, Feather} from "@expo/vector-icons";
import {color} from "@/constants/colors";
import ContactForm from "@/components/ContactForm";

function Contact() {
    return (
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <MapScreen />

          <View className={'flex flex-col gap-y-4 mx-4'}>
              <View className={"flex flex-row items-center justify-between mt-4"}>
                  <View className={"flex flex-col w-48 items-center justify-center bg-white p-3 rounded-lg"}>
                      <Feather name="phone-call" size={24} color={color.mainColor} />
                      <Text className={'text-xs'}>+90 (534) 260 8385</Text>
                  </View>

                  <View className={"flex flex-col p-3 w-48 items-center justify-center bg-white rounded-lg"}>
                      <Entypo name="mail" size={24} color={color.mainColor} />
                      <Text className={'text-xs'}>arzuambermoda@gmail.com</Text>
                  </View>
              </View>
             <View className={'flex items-center justify-center w-full'}>
                 <View className={"flex flex-col p-3 w-full items-center justify-center bg-white rounded-lg"}>
                     <Entypo name="address" size={24} color={color.mainColor} />
                     <Text className={'text-sm text-center'}>Kışla Mahallesi,
                         Cadde 40, Kayalar Apartmanı,
                         No: 8,Blok A, Kat: 4, Daire: 7
                         Antalya,Muratpaşa,Türkiye</Text>
                 </View>
             </View>
          </View>
          <ContactForm />
      </View>
    );
}

export default Contact;