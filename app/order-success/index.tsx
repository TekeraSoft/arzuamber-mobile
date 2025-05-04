import React from "react";
import { Image, Text, View } from "react-native";

function OrderSuccess() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginHorizontal: 15 }}>
      <Image
        source={require("../../assets/icons/payment-success-ico.png")}
        style={{ width: 100, height: 100 }}
      />
      <Text className={"text-green-600 font-bold text-2xl"}>
        Ödeme Başarılı
      </Text>
      <Text className={"text-gray-500 mt-4"}>
        - Sipariş Detaylarınız Mail Adresinize Gönderildi.
      </Text>
        <Text className={"text-gray-500 mt-4"}>
            - Siparişiniz En Kısa
            Sürede Kargoya Verilecektir
        </Text>
    </View>
  );
}

export default OrderSuccess;
