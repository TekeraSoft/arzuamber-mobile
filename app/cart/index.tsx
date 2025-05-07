import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import { RESOURCE_API } from "@/config";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { color } from "@/constants/colors";
import {useRouter} from "expo-router";
import {removeFromCartAsync} from "@/store/cartSlice";
import {Feather} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function CartDetail() {
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRouter();


  return cartProducts?.length !== 0 ? (
      <View style={{ flex: 1 }} className={'bg-gray-50'}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                  paddingBottom: 150, // Alt kısımda yeterli boşluk bırakmak için
              }}
          >
              {cartProducts.map((item, index) => (
                  <View
                      key={index}
                      style={{
                          shadowOffset: { width: 0, height: -3 },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                      }}
                      className="flex flex-row my-2 items-center gap-x-4 border border-gray-300 rounded-lg bg-white p-1"
                  >
                      <Image
                          src={`${RESOURCE_API}${item.image}`}
                          className="w-16 h-24 rounded-lg"
                      />
                      <View className="flex flex-col gap-y-2">
                          <Text className="font-medium w-80">{item.name}</Text>
                          <View className="flex flex-row items-center gap-x-8">
                              <Text>
                                  <Text className="text-blue-600">Beden: </Text> {item.size}
                              </Text>
                              <Text>
                                  <Text className="text-blue-600">Renk: </Text> {item.color}
                              </Text>
                          </View>
                          <View className="flex flex-row justify-between items-center">
                              <View className="flex flex-row items-center border border-gray-300 w-32 rounded-full gap-x-2 px-2 py-1">
                                  <TouchableOpacity onPress={()=> dispatch(removeFromCartAsync(item))}>
                                      <MaterialCommunityIcons
                                          name="delete-circle-outline"
                                          size={24}
                                          color="red"
                                      />
                                  </TouchableOpacity>
                                  <Text>{item.quantity} Adet</Text>
                              </View>
                              <Text className="text-lg font-medium">
                                  {item.price.toLocaleString("tr-TR", {
                                      style: "currency",
                                      currency: "TRY",
                                  })}
                              </Text>
                          </View>
                      </View>
                  </View>
              ))}
          </ScrollView>
          <View
              style={{
                  position: "absolute",
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap:10,
                  bottom: 0,
                  height:Platform.OS === "ios" ? height * 0.14 : height * 0.26,
                  alignSelf: "flex-end",
                  backgroundColor: 'white',
                  width:'100%',
                  shadowOffset: { width: 0, height: -3 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  padding:15
              }}
          >
              <View className={'flex flex-row items-center justify-between'}>
                  <Text className={'font-bold'}>Toplam <Text className={'text-xs text-gray-400'}>(kargo ödeme sayfasında hesaplanır)</Text></Text>
                  <Text className={'text-green-600 font-bold'}>{total.toFixed(2)} TL</Text>
              </View>
              <TouchableOpacity  onPress={()=> navigation.push('/payment')} className={'rounded-lg p-3'} style={{backgroundColor:color.mainColor}}>
                  <Text className={"text-lg font-medium text-center text-white"}>Sepeti Onayla</Text>
              </TouchableOpacity>
          </View>
      </View>
  ) : (
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
          <Feather name="shopping-cart" size={100} color="gray" />
          <Text className={'text-gray-400'} style={{fontSize:48}}>Sepetiniz Boş</Text>
      </View>
  )
}

export default CartDetail;
