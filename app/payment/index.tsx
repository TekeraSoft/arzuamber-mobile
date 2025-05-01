import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RESOURCE_API } from "@/config";
import { color } from "@/constants/colors";
import { filterData } from "@/data/filterData";
import { MaterialIcons } from "@expo/vector-icons";
import { removeFromCartAsync } from "@/store/cartSlice";
import { usePathname, useRouter } from "expo-router";
import PaymentForm from "@/components/PaymentForm";
import React, {useEffect, useRef} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");

function Payment() {
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (cartProducts.length === 0 && path === "/payment") {
      router.push("(tabs)");
    }
  }, [cartProducts]);

  return Platform.OS === "ios" ? (
      <KeyboardAwareScrollView
          enableOnAndroid
          keyboardOpeningTime={3}
          keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 80}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginHorizontal: 5, gap: 12 }}
            horizontal
            data={cartProducts}
            keyExtractor={(item ) => item.id.toString()}
            renderItem={({ item,index }) => (
                <View
                    key={index}
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      elevation: 5,
                    }}
                    className={`flex flex-row items-center justify-between gap-x-4 border p-2 rounded-lg bg-white pb-2 border-gray-300`}
                >
                  <View className="flex flex-row items-start gap-x-4">
                    <Image
                        source={{ uri: `${RESOURCE_API}${item.image}` }}
                        style={{ width: 30, height: 60, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                    <View className="flex flex-col gap-y-2">
                      <Text className="text-xs w-64">{item.name}</Text>
                      <Text className="text-sm font-medium">
                        {item.price.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}
                      </Text>
                      <View className={"flex flex-row items-center gap-x-2"}>
                        <Text className="text-xs">{item.quantity} Adet</Text>
                        <TouchableOpacity
                            onPress={() => dispatch(removeFromCartAsync(item))}
                            className={
                              "flex flex-row items-center border border-red-600 px-2 rounded-lg"
                            }
                        >
                          <MaterialIcons
                              name="delete-forever"
                              size={18}
                              color="red"
                          />
                          <Text style={{ color: "red" }} className={"text-xs"}>
                            Sepetten Çıkar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-col gap-y-2 justify-start items-start">
                    <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">
                      {item.size}
                    </Text>
                    <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">
                      {item.color}
                    </Text>
                  </View>
                </View>
            )}
        />

        {/* Ödeme Özeti */}
        <View style={{ paddingVertical: 8 }}>
          <View
              className={"bg-purple-200 p-2 rounded-lg flex flex-col gap-y-2 mx-3"}
          >
            <View className={"flex flex-row items-center justify-between"}>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-xl font-medium"}
              >
                Ara Toplam
              </Text>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-lg font-medium"}
              >
                {total.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </Text>
            </View>

            <View className={"flex flex-row items-center justify-between"}>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-xl font-medium"}
              >
                Kargo
              </Text>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-lg font-medium"}
              >
                {total >= filterData.maxShippingPrice
                    ? "Ücretsiz"
                    : filterData.shippingPrice}
              </Text>
            </View>

            <View className={"flex flex-row items-center justify-between"}>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-xl font-medium"}
              >
                Toplam
              </Text>
              <Text
                  style={{ color: color.mainColorDark }}
                  className={"text-xl font-bold"}
              >
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

        {/* Ödeme Formu */}
        <PaymentForm />
        {/*</ScrollView>*/}
      </KeyboardAwareScrollView>
      ): (
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          //keyboardVerticalOffset={110}
      >
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
      <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 5, gap: 12 }}
          horizontal
          data={cartProducts}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={({ item,index }) => (
              <View
                  key={index}
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    elevation: 5,
                  }}
                  className={`flex flex-row items-center justify-between gap-x-4 border p-2 rounded-lg bg-white pb-2 border-gray-300`}
              >
                <View className="flex flex-row items-start gap-x-4">
                  <Image
                      source={{ uri: `${RESOURCE_API}${item.image}` }}
                      style={{ width: 30, height: 60, borderRadius: 8 }}
                      resizeMode="cover"
                  />
                  <View className="flex flex-col gap-y-2">
                    <Text className="text-xs w-64">{item.name}</Text>
                    <Text className="text-sm font-medium">
                      {item.price.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </Text>
                    <View className={"flex flex-row items-center gap-x-2"}>
                      <Text className="text-xs">{item.quantity} Adet</Text>
                      <TouchableOpacity
                          onPress={() => dispatch(removeFromCartAsync(item))}
                          className={
                            "flex flex-row items-center border border-red-600 px-2 rounded-lg"
                          }
                      >
                        <MaterialIcons
                            name="delete-forever"
                            size={18}
                            color="red"
                        />
                        <Text style={{ color: "red" }} className={"text-xs"}>
                          Sepetten Çıkar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View className="flex flex-col gap-y-2 justify-start items-start">
                  <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">
                    {item.size}
                  </Text>
                  <Text className="bg-purple-200 text-[9px] p-1 rounded-full px-2">
                    {item.color}
                  </Text>
                </View>
              </View>
          )}
      />

  {/* Ödeme Özeti */}
  <View style={{ paddingVertical: 8 }}>
    <View
        className={"bg-purple-200 p-2 rounded-lg flex flex-col gap-y-2 mx-3"}
    >
      <View className={"flex flex-row items-center justify-between"}>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-xl font-medium"}
        >
          Ara Toplam
        </Text>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-lg font-medium"}
        >
          {total.toLocaleString("tr-TR", {
            style: "currency",
            currency: "TRY",
          })}
        </Text>
      </View>

      <View className={"flex flex-row items-center justify-between"}>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-xl font-medium"}
        >
          Kargo
        </Text>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-lg font-medium"}
        >
          {total >= filterData.maxShippingPrice
              ? "Ücretsiz"
              : filterData.shippingPrice}
        </Text>
      </View>

      <View className={"flex flex-row items-center justify-between"}>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-xl font-medium"}
        >
          Toplam
        </Text>
        <Text
            style={{ color: color.mainColorDark }}
            className={"text-xl font-bold"}
        >
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

  {/* Ödeme Formu */}
  <PaymentForm />
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

export default Payment;
