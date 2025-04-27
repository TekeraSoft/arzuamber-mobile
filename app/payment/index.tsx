import React, {useEffect} from "react";
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/store/store";
import { RESOURCE_API } from "@/config";
import {color} from "@/constants/colors";
import {filterData} from "@/data/filterData";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {MaterialIcons} from "@expo/vector-icons";
import {removeFromCartAsync} from "@/store/cartSlice";
import {useLocalSearchParams, usePathname, useRouter} from "expo-router";

const { height, width } = Dimensions.get("window");

function Payment() {
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch()
    const router = useRouter();
  const path = usePathname()

    useEffect(() => {
        if(cartProducts.length === 0 && path === '/payment') {
            router.push("(tabs)")
        }
    }, [cartProducts]);

  return (
      <View style={{ flex: 1 }}>

        {/* ScrollView sadece ekranın yarısı kadar yer kaplasın */}
        <View style={{ height: cartProducts.length >= 3 ? height * 0.3: height * 0.2, borderRadius:10 }}>
          <ScrollView
              className="bg-gray-100"
              indicatorStyle='black'
              contentContainerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
          >
            {cartProducts.map((item, index) => (
                <View
                    key={index}
                    className="flex flex-row items-center justify-between gap-x-4 mb-3 border-b pb-2 border-gray-300"
                >
                  <View className="flex flex-row items-start gap-x-4">
                     <Image
                         source={{ uri: `${RESOURCE_API}${item.image}` }}
                         style={{ width: 30, height: 60, borderRadius: 8 }}
                         resizeMode="cover"
                     />
                    <View className="flex flex-col gap-y-2">
                      <Text className="text-xs">{item.name}</Text>
                      <Text className="text-sm font-medium">
                        {item.price.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}
                      </Text>
                      <View className={'flex flex-row items-center gap-x-2'}>
                        <Text className="text-xs">{item.quantity} Adet</Text>
                        <TouchableOpacity onPress={()=> dispatch(removeFromCartAsync(item))} className={'flex flex-row items-center border border-red-600 px-2 rounded-lg'}>
                          <MaterialIcons name="delete-forever" size={18} color="red" />
                          <Text style={{color:'red'}} className={'text-xs'}>Sepetten Çıkar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-col gap-y-2 justify-start items-start">
                    <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">{item.size}</Text>
                    <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">{item.color}</Text>
                  </View>
                </View>
            ))}
          </ScrollView>
        </View>
        {/* Alt taraf, örneğin bir buton için */}
        <View style={{ padding: 8 }}>
          <View className={'bg-purple-200 p-2 rounded-lg flex flex-col gap-y-2'}>

           <View className={'flex flex-row items-center justify-between'}>
             <Text style={{color: color.mainColorDark}} className={'text-xl font-medium'}>
               Ara Toplam
             </Text>
             <Text style={{color: color.mainColorDark}} className={'text-lg font-medium'}>
               {total.toLocaleString("tr-TR", {
                 style: "currency",
                 currency: "TRY",
               })}
             </Text>
           </View>

            <View className={'flex flex-row items-center justify-between'}>
              <Text style={{color: color.mainColorDark}} className={'text-xl font-medium'}>
                Kargo
              </Text>
              <Text style={{color: color.mainColorDark}} className={'text-lg font-medium'}>
                {(total >= filterData.maxShippingPrice
                        ? 'Ücretsiz'
                        : filterData.shippingPrice
                )}
              </Text>
            </View>

            <View className={'flex flex-row items-center justify-between'}>
              <Text style={{color: color.mainColorDark}} className={'text-xl font-medium'}>
                Toplam
              </Text>
              <Text style={{color: color.mainColorDark}} className={'text-xl font-bold'}>
                {(total >= filterData.maxShippingPrice
                        ? total
                        : total + filterData.shippingPrice
                ).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </Text>
            </View>

          </View>
        </View>

      </View>

  );
}

export default Payment;
