import React, {useEffect, useState} from "react";
import {
    Animated,
    Dimensions,
    Image, Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { handleOpenCartModal } from "@/store/generalSlice";
import { MaterialIcons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { RESOURCE_API } from "@/config";
import { rehydrateCart, removeFromCartAsync } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { color } from "@/constants/colors";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

function Cart({props}) {
  const dispatch = useDispatch();
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const { openCartModal } = useSelector((state: RootState) => state.general);

    const [scale] = useState(new Animated.Value(0)); // Başlangıçta badge büyüklüğü 0

    useEffect(() => {
        if (cartProducts?.length > 0) {
            // Badge'e animasyon ekle
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5, // Büyütme
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1, // Küçültme
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [cartProducts]); // Cart değiştikçe animasyon tetiklenir


    useEffect(() => {
    dispatch(rehydrateCart());
  }, [dispatch]);

  return (
    <TouchableOpacity
      onPress={() => cartProducts.length > 0 && dispatch(handleOpenCartModal())}
      className={"gap-x-8 mr-3 relative"}
    >
        <MaterialCommunityIcons
            name="cart-outline"
            size={28}
            style={{color:'white'}}
        />

        {/* Animated Badge */}
            <Animated.View
                style={{
                    transform: [{ scale }], // Animasyonlu scale
                    position: "absolute",
                    right: -8,
                    top: -8,
                    backgroundColor: "#ec4899",
                    width: 18,
                    height: 18,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 12 }}>
                    {cartProducts?.length}
                </Text>
            </Animated.View>
      <ReactNativeModal
          isVisible={openCartModal}
          onBackdropPress={() => dispatch(handleOpenCartModal())}
          onBackButtonPress={() => dispatch(handleOpenCartModal())}
          style={{ justifyContent: "flex-end", margin: 0, borderRadius: 0 }}
          backdropColor={0.25}
          animationIn="slideInUp" // Ekleme animasyonu
          animationOut="slideOutDown" // Çıkma animasyonu
          backdropTransitionInTiming={300} // Arka planın geçiş süresi
          backdropTransitionOutTiming={300} // Arka planın çıkış süresi
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 15,
            height: height * 0.6,
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
          }}
        >
          <View
            className={
              "flex flex-row items-center justify-between my-4 pb-4 relative"
            }
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sepetiniz</Text>
            <TouchableOpacity onPress={() => dispatch(handleOpenCartModal())}>
              <MaterialIcons name="cancel" size={28} color="black" />
            </TouchableOpacity>
          </View>
            {
                cartProducts?.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    >
                        {cartProducts?.map((item, index) => (
                            <View
                                key={index}
                                className={
                                    "bg-white border border-gray-300 rounded-lg p-2 mt-2"
                                }
                                //       style={{
                                //     shadowColor: "#000",
                                //     shadowOffset: { width: 0, height: 2 },
                                //     shadowOpacity: 0.1,
                                //     shadowRadius: 3.84,
                                //     elevation: 5,
                                // }}
                            >
                                <View className={"flex flex-row items-center justify-between"}>
                                    <View className={"flex flex-row justify-between gap-x-4"}>
                                        <Image
                                            source={{ uri: `${RESOURCE_API}${item.image}` }}
                                            style={{ width: 40, height: 80, borderRadius: 8 }}
                                            resizeMode="cover"
                                        />
                                        <View className={"flex flex-col gap-y-2"}>
                                            <Text className={"font-medium text-lg text-gray-500"}>
                                                {item.name.length >= 30
                                                    ? `${item.name.slice(0, 30)}...`
                                                    : item.name}
                                            </Text>
                                            <View className={"flex flex-row items-center gap-x-4"}>
                                                <Text className={"font-medium text-md text-gray-500"}>
                                                    <Text className={"text-pink-500"}>Renk:</Text>{" "}
                                                    {item.color}
                                                </Text>
                                                <Text className={"font-medium text-md text-gray-500"}>
                                                    <Text className={"text-pink-500"}>Beden:</Text>{" "}
                                                    {item.size}
                                                </Text>
                                            </View>
                                            <View
                                                className={"flex flex-row items-center justify-between"}
                                            >
                                                <Text className={"font-bold text-md text-gray-500"}>
                                                    {item.price.toLocaleString("tr-TR", {
                                                        style: "currency",
                                                        currency: "TRY",
                                                    })}
                                                </Text>
                                                <Text>
                                                    <Text className={"text-pink-500"}>Adet:</Text>{" "}
                                                    {item.quantity}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => dispatch(removeFromCartAsync(item))}
                                    >
                                        <MaterialIcons name="remove-circle" size={28} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                ): (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:color.mainColor,fontWeight:'bold',fontSize:20}}>Sepetiniz Boş</Text>
                    </View>
                )
            }
          {/* Sabitlenmiş buton */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color.mainColor, // bg-blue-600
              padding: 16,
                height: Platform.OS === "ios" ? height * 0.08 : height * 0.08,
              alignItems: "center",
            }}
          >
            <Link
              href={"cart"}
              onPress={() => dispatch(handleOpenCartModal())}
            >
              <Text className={"text-white font-bold text-xl"}>SEPETE GİT - {total.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
              })}</Text>
            </Link>
          </View>
        </View>
      </ReactNativeModal>
    </TouchableOpacity>
  );
}

export default Cart;
