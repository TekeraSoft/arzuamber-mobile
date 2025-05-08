import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RESOURCE_API } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

function UserOrder() {
  const { orders } = useSelector((state: RootState) => state.user);

  return (
    <View style={{ flex: 1 }} className={"bg-gray-50"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 10,
          marginHorizontal: 10,
          paddingBottom: 150, // Alt kısımda yeterli boşluk bırakmak için
        }}
      >
          {orders.map((order, index) => (
              <View
                  key={index}
                  className="my-2 border border-gray-300 rounded-lg bg-white p-2"
              >
                  {/* Sipariş Başlığı */}
                  <View className="flex flex-row items-center justify-between border-b border-gray-300 pb-2 mb-2">
                      <Text style={{ flex: 1 }}>
                          {new Date(order.createdAt).toLocaleString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              weekday: "short",
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                          })}
                      </Text>
                      <View className={`${
                          order.status ==='PAID' && 'bg-purple-500' || 
                          order.status === 'PAY_AT_DOOR' && 'bg-green-400' ||
                          order.status === 'PENDING' && 'bg-red-500' ||
                          order.status === 'PENDING' && 'bg-blue-500' 
                      } p-1 px-2 rounded-lg text-white`}>
                          <Text className={'text-white'}>{
                              order.status === 'PAY_AT_DOOR' && 'KAPIDA ÖDEME' ||
                              order.status === 'PAID' && 'ÖDENDİ' ||
                              order.status === 'SHIPPED' && 'KARGOYA VERİLDİ' ||
                              order.status === 'PENDING' && 'HATALI İŞLEM'
                          }</Text>
                      </View>
                  </View>

                  {/* Ürünler */}
                  {order?.basketItems.map((basketItem, index) => (
                      <View
                          key={index}
                          className="flex flex-row items-center gap-x-2 mb-2 border border-gray-200 rounded p-2"
                      >
                          <Image
                              source={{ uri: `${RESOURCE_API}${basketItem.image}` }}
                              className="w-16 h-24 rounded-lg"
                          />
                          <View className="flex flex-col">
                              <Text className="font-semibold text-sm w-80">{basketItem.name}</Text>
                              <Text>Fiyat: {basketItem.price} ₺</Text>
                              <Text>Adet: {basketItem.quantity}</Text>
                              <Text>Beden: {basketItem.size}</Text>
                          </View>
                      </View>
                  ))}
              </View>
          ))}
      </ScrollView>
    </View>
  );
}

export default UserOrder;
