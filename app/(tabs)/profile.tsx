import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import SignIn from "@/components/SignIn";
import {ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {color} from "@/constants/colors";
import {Entypo, Feather, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import FavoriteCard from "@/components/product/FavoriteCard";
import SignUp from "@/components/SignUp";
import {getUserOrdersDispatch} from "@/store/userSlice";
import {router} from "expo-router";

function Profile() {
    const {session, user,loading, signOut} = useAuth()
    const {favorites} = useSelector((state:RootState) => state.favs)
    const {authModal} = useSelector((state:RootState) => state.general)
    const {orders} = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(user) {
            dispatch(getUserOrdersDispatch(user?.email))
        }
    }, []);

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={color.mainColor}/>
            </View>
        );
    }


    if (!session) {
        return !authModal ? <SignIn/> : <SignUp/>
    }

    return (
        <View className={'flex-1 bg-white'}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
                <View className={'flex items-center justify-center gap-y-1 mx-3 mt-4'}>
                    <View className={'flex items-center justify-center gap-y-1 w-full rounded-lg border border-gray-300 p-4 bg-white'} style={{
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3
                    }}>
                        <TouchableOpacity className={'rounded-lg bg-red-600 p-2 absolute right-2 top-1'} onPress={()=> signOut()}>
                            <Text className={'text-white text-xs'}>Çıkış Yap</Text>
                        </TouchableOpacity>
                        <View className={'flex flex-row items-center justify-start w-full gap-x-4'}>
                            <View className={'flex justify-center items-center bg-purple-500 rounded-full w-28 h-28'}>
                                <Text className={'text-white text-[44px] font-bold'}>{user?.nameSurname?.trim()
                                    .split(' ')
                                    .map(part => part[0]?.toUpperCase())
                                    .slice(0, 2)
                                    .join('')}</Text>
                            </View>
                            <View className={'flex flex-col gap-y-1'}>
                                <Text style={{color: color.mainColorDark}} className={'text-xl font-bold'}>{user?.nameSurname}</Text>
                                <Text style={{color: color.mainColorDark}} className={'text-sm'}>{user?.email}</Text>
                                <TouchableOpacity className={'flex items-center justify-center w-32 rounded-lg p-1'} style={{backgroundColor:'blue'}}>
                                    <Text className={'text-white text-xs'}>Profili Düzenle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View className={'flex flex-row gap-x-6 mt-6'}>
                        <TouchableOpacity onPress={()=> router.push('user-order')} style={{flex: 1}} className={'bg-teal-500 p-2 rounded-lg flex flex-col w-44 justify-center items-center'}>
                            <Feather name="shopping-cart" size={32} color="white" />
                            <Text className={'text-white text-2xl'}>{orders?.length}</Text>
                            <Text className={'text-white'}>Toplam Sipariş</Text>
                        </TouchableOpacity>

                        <View style={{flex: 1}} className={'bg-green-500 p-2 rounded-lg flex flex-col w-44 justify-center items-center'}>
                            <FontAwesome5 name="money-bill-wave" size={32} color="white" />
                            <Text className={'text-white text-2xl'}>{orders?.reduce((acc, i) => acc + i.totalPrice, 0).toLocaleString("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                            })}</Text>
                            <Text className={'text-white'}>Toplam Harcama (₺)</Text>
                        </View>
                    </View>

                    <View className={'flex flex-col gap-y-3 bg-white mt-4 w-full p-3 rounded-lg border border-gray-300'} style={{
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <View className={'flex flex-row gap-x-4 items-center'}>
                            <MaterialCommunityIcons name="card-account-details-outline" size={24} color="black" />
                            <Text>{user?.nameSurname}</Text>
                        </View>

                        <View className={'flex flex-row gap-x-4 items-center'}>
                            <MaterialIcons name="email" size={24} color="black" />
                            <Text>{user?.email}</Text>
                        </View>

                        <View className={'flex flex-row gap-x-4 items-center'}>
                            <Entypo name="phone" size={24} color="black" />
                            <Text>{user?.phoneNumber}</Text>
                        </View>

                        <View className={'flex flex-row gap-x-4 items-center w-80'}>
                            <Entypo name="address" size={24} color="black" />
                            <Text style={{fontSize:12}}>{user?.address}</Text>
                        </View>
                    </View>
                </View>
                <Text className={'my-4 text-2xl font-bold ml-4'} style={{color:color.mainColor}}>Favorileriniz</Text>
                {
                    favorites?.length > 0 ? (
                        <FlatList nestedScrollEnabled={true} horizontal showsHorizontalScrollIndicator={false} data={favorites} keyExtractor={(item) => item?.id?.toString()}
                                  renderItem={({ item })=> (
                                      <FavoriteCard product={item} />
                                  )} />
                    ): (
                        <View className={'w-full flex items-center mt justify-center mt-12'}>
                            <Text className={'text-purple-500 text-2xl font-bold italic'}>Favorilerinize Ürün Eklemediniz!</Text>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default Profile;