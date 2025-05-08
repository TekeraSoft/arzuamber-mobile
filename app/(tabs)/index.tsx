import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { getCategoriesDispatch } from "@/store/categorySlice";
import { getAllHomeSliderImages } from "@/store/generalSlice";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import {
  getNewSeasonProductsDispatch,
  getPopulateProductsDispatch,
} from "@/store/productSlice";
import { color } from "@/constants/colors";
import {AntDesign, FontAwesome5, FontAwesome6} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RESOURCE_API } from "@/config";
import Card from "@/components/product/Card";
import {router} from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);
  const { homeSliderImages, loading } = useSelector(
    (state: RootState) => state.general,
  );
  const { populateProducts, newSeasonProducts } = useSelector(
    (state: RootState) => state.product,
  );
  const [pageable, setPageable] = useState({ page: 0, size: 10 });
  const { width, height } = Dimensions.get("window");
  const progress = useSharedValue<number>(0);
  const { t }: { t: (type: string) => string } = useTranslation();
  useEffect(() => {
    dispatch(getCategoriesDispatch());
    dispatch(getAllHomeSliderImages());
    dispatch(getNewSeasonProductsDispatch(pageable.page, pageable.size));
    dispatch(getPopulateProductsDispatch(pageable.page, pageable.size));
  }, [dispatch]);

  return (
    <ScrollView style={{backgroundColor:'white'}}
                contentContainerStyle={{paddingBottom:100}}
                showsVerticalScrollIndicator={false}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
              onPress={()=> router.push({pathname:'product', params: {categoryName: item.name}})}
            key={item.id}
            className={`flex justify-center items-center mx-2 my-4`}
          >
            <View
              className={`rounded-full flex items-center justify-center border-2 border-purple-500`}
              style={{ width: width * 0.15, height: width * 0.15 }}
            >
              <Image
                src={`${RESOURCE_API}${item.image}`}
                className="rounded-full"
                style={{ width: width * 0.14, height: width * 0.14 }}
              />
            </View>
            <Text className={"text-md"}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Carousel
        autoPlay={true}
        autoPlayInterval={3000}
        width={width}
        height={height * 0.15}
        data={homeSliderImages}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            src={`${RESOURCE_API}${item.url}`}
            style={{width: width, height: height * 0.15}}
            resizeMode="stretch"
          />
        )}
      />

      <View className="mt-4 mx-2 flex flex-row flex-wrap justify-between gap-y-2">
        <View
          className={`border border-gray-300 flex items-center justify-center rounded-lg p-2`}
          style={{ width: width * 0.47 }}
        >
          <View className={`flex flex-row justify-center items-center gap-x-4`}>
            <FontAwesome5 name="shipping-fast" size={24} color="green" />
            <Text className={"font-bold"}>{t("freeShippingTitle")}</Text>
          </View>
          <Text className={"text-green-600 text-center mt-2 text-xs"}>
            {t("freeShipping")}
          </Text>
        </View>

        <View
          className={`border border-gray-300 rounded-lg p-2`}
          style={{ width: width * 0.47 }}
        >
          <View className={`flex flex-row justify-center items-center gap-x-4`}>
            <FontAwesome5 name="gift" size={24} color="red" />
            <Text className={"font-bold"}>{t("campaignTitle")}</Text>
          </View>
          <Text className={"text-center text-xs text-red-500 mt-2"}>
            {t("campaign")}
          </Text>
        </View>

        <View
          className={`border border-gray-300 w-52 rounded-lg p-2`}
          style={{ width: width * 0.47 }}
        >
          <View className={`flex flex-row justify-center items-center gap-x-4`}>
            <MaterialCommunityIcons name="cash" size={24} color="blue" />
            <Text className={"font-bold"}>{t("payAtDoorTitle")}</Text>
          </View>
          <Text className={"text-center text-xs text-blue-500 mt-2"}>
            {t("payAtDoorDesc")}
          </Text>
        </View>

        <View
          className={`border border-gray-300 w-52 rounded-lg p-2`}
          style={{ width: width * 0.47 }}
        >
          <View className={`flex flex-row justify-center items-center gap-x-4`}>
            <FontAwesome6
              name="arrow-right-arrow-left"
              size={24}
              color="purple"
            />
            <Text className={"font-bold"}>{t("easyReturnTitle")}</Text>
          </View>
          <Text className={"text-center text-xs text-purple-500 mt-2"}>
            {t("easyReturnDesc")}
          </Text>
        </View>
      </View>

      <View className={"w-full py-4"}>
        <Text
          className={`text-center font-bold text-2xl`}
          style={{ color: color.mainColor }}
        >
          {t("popularProductTitle")}
        </Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 5, gap: 12 }}
        horizontal
        data={populateProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card key={item.id} product={item} />}
      />

      <View
        className={`flex flex-row items-center justify-between bg-purple-500 gap-x-4 mx-2 px-4 py-2 rounded-lg mt-4`}
      >
        <View className={"flex flex-row items-center gap-x-4"}>
          <Image
            source={require("../../assets/images/discount-icon.png")}
            className={"w-16 h-16"}
          />
          <Text className={"text-white py-4 text-2xl font-bold"}>
            İndirimleri Keşfet!
          </Text>
        </View>
        <TouchableOpacity onPress={()=> router.push('product')} className={"bg-white p-2 rounded-lg"}>
          <Text className={"text-black text-lg"}>Keşfet</Text>
        </TouchableOpacity>
      </View>

      <View className={"w-full py-4"}>
        <Text
          className={`text-center font-bold text-2xl`}
          style={{ color: color.mainColor }}
        >
          {t("newSeasonProductTitle")}
        </Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 5,
          gap: 12,
        }}
        horizontal
        data={newSeasonProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card key={item.id} product={item} />}
      />

        <View className={'flex flex-col gap-y-3 mx-3 mt-10'}>

            <TouchableOpacity onPress={()=> router.push('kvkk')} className={'border border-gray-300 flex flex-row items-center justify-between w-full p-3 rounded-lg'}>
                <Text>KVKK</Text>
                <AntDesign name="right" size={18} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> router.push('crpolicy')} className={'border border-gray-300 flex flex-row items-center justify-between w-full p-3 rounded-lg'}>
                <Text>İade Politikası</Text>
                <AntDesign name="right" size={18} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> router.push('distance-policy')} className={'border border-gray-300 flex flex-row items-center justify-between w-full p-3 rounded-lg'}>
                <Text>Mesafeli Satış Sözleşmesi</Text>
                <AntDesign name="right" size={18} color="gray" />
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
