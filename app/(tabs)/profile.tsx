import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {color} from "@/constants/colors";
import {Entypo, Feather, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function Profile() {
    return (
        <View className={'flex-1 bg-white'}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
            <View className={'flex items-center justify-center gap-y-1'}>
                <View className={'flex items-center justify-center gap-y-1 w-full rounded-lg border border-gray-300 p-4 bg-white'} style={{
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3
                }}>
                   <View className={'flex flex-row items-center justify-start w-full gap-x-4'}>
                       <View className={'flex justify-center items-center bg-purple-500 rounded-full w-28 h-28'}>
                           <Text className={'text-white text-[44px] font-bold'}>BD</Text>
                       </View>
                      <View className={'flex flex-col gap-y-1'}>
                          <Text style={{color: color.mainColorDark}} className={'text-xl font-bold'}>Bayramali Durak</Text>
                          <Text style={{color: color.mainColorDark}} className={'text-sm'}>bdurak3@gmail.com</Text>
                          <TouchableOpacity className={'flex items-center justify-center rounded-lg p-1'} style={{backgroundColor:'blue'}}>
                            <Text className={'text-white text-xs'}>Profili Düzenle</Text>
                          </TouchableOpacity>
                      </View>
                   </View>
                </View>

                <View className={'flex flex-row gap-x-6 mt-6'}>
                    <TouchableOpacity style={{flex: 1}} className={'bg-teal-500 p-2 rounded-lg flex flex-col w-44 justify-center items-center'}>
                        <Feather name="shopping-cart" size={32} color="white" />
                        <Text className={'text-white text-2xl'}>0</Text>
                        <Text className={'text-white'}>Toplam Sipariş</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1}} className={'bg-green-500 p-2 rounded-lg flex flex-col w-44 justify-center items-center'}>
                        <FontAwesome5 name="money-bill-wave" size={32} color="white" />
                        <Text className={'text-white text-2xl'}>0</Text>
                        <Text className={'text-white'}>Toplam Harcama (₺)</Text>
                    </TouchableOpacity>
                </View>

                <View className={'flex flex-col gap-y-3 bg-white mt-4 w-full p-3 rounded-lg border border-gray-300'} style={{
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <View className={'flex flex-row gap-x-4 items-center'}>
                        <MaterialCommunityIcons name="card-account-details-outline" size={24} color="black" />
                        <Text>Bayramali Durak</Text>
                    </View>

                    <View className={'flex flex-row gap-x-4 items-center'}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <Text>bdurak3@gmail.com</Text>
                    </View>

                    <View className={'flex flex-row gap-x-4 items-center'}>
                        <Entypo name="phone" size={24} color="black" />
                        <Text>(530) 088 95 07</Text>
                    </View>

                    <View className={'flex flex-row gap-x-4 items-center w-80'}>
                        <Entypo name="address" size={24} color="black" />
                        <Text style={{fontSize:12}}>Kanal Mahallesi 4733 sok. Mehmet Keskin Apt. Kat:3 No:5 KEPEZ/ANTALYA</Text>
                    </View>
                </View>
            </View>

        </ScrollView>
        </View>
    );
}

export default Profile;