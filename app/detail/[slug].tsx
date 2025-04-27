import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProductBySlugDispatch } from "@/store/productSlice";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { color } from "@/constants/colors";
import { RESOURCE_API } from "@/config";
import { addToCart, addToCartAsync } from "@/store/cartSlice";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import RenderHTML from "react-native-render-html";
import Lightbox from "react-native-lightbox-v2";

const { width, height } = Dimensions.get("window");

function ProductDetail() {
  const { slug } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const { product } = useSelector((state: RootState) => state.product);
  const [stockSizeState, setStockSizeState] = useState(product?.colorSize[0]);
  const [stateProduct, setStateProduct] = useState({
    size: null,
    color: stockSizeState?.color,
    totalStock: null,
    stockSizeId: null,
    price: null,
    quantity: 1,
  });
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    dispatch(getProductBySlugDispatch(slug));
  }, [dispatch]);

  useEffect(() => {
    if (product?.colorSize) {
      setStockSizeState(product.colorSize[0]);
    }
  }, [product]);

  const progress = useSharedValue<number>(0);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailPress = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
    setCurrentIndex(index);
  };

  const addCart = () => {
    dispatch(
      addToCartAsync({
        id: product.id,
        name: product.name,
        category1: product.category,
        category2: product.subCategory,
        color: stockSizeState?.color,
        image: stockSizeState?.images[0],
        size: stateProduct.size,
        stockSizeId: stateProduct?.stockSizeId,
        stockCode: stockSizeState?.stockCode,
        quantity: stateProduct.quantity,
        price:
          product.discountPrice !== 0 && product.discountPrice
            ? product.discountPrice
            : product.price,
      }),
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 12 }}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.thumbnailList}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {stockSizeState?.images.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleThumbnailPress(index)}
            >
              <Image
                src={`${RESOURCE_API}${item}`}
                style={[
                  styles.thumbnail,
                  index === currentIndex && { borderColor: "blue" },
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sağ carousel */}
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width * 0.7}
          height={width * 0.8}
          data={stockSizeState?.images}
          scrollAnimationDuration={300}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item, index }) => (
              <Lightbox>
                <Image
                    src={`${RESOURCE_API}${item}`}
                    style={styles.carouselImage}
                />
              </Lightbox>
          )}
        />
      </View>
      <View className={"flex flex-col w-full mt-4"}>
        <Text className={"font-bold text-xl text-start text-gray-500"}>
          {product?.name}
        </Text>
        <View className={"flex w-full items-end"}>
          {product?.discountPrice !== 0 ? (
            <View className={"flex flex-row items-center gap-x-4"}>
              <Text
                className={`font-bold text-green-600 text-end`}
                style={{ fontSize: 24 }}
              >
                {product?.discountPrice.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </Text>
              <Text
                className={`font-bold text-end line-through`}
                style={{
                  color: color.mainColor,
                  fontSize: 24,
                }}
              >
                {product?.price.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </Text>
            </View>
          ) : (
            <Text
              className={`font-bold text-end`}
              style={{
                color: color.mainColor,
                fontSize: 24,
              }}
            >
              {product?.price.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </Text>
          )}
        </View>
        <Text className={"text-md font-bold mb-2"}>Renk Seçiniz:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {product?.colorSize.map((color, index) => (
            <TouchableOpacity
              key={index}
              className={`mr-3 flex flex-col items-center`}
              onPress={() => {
                setStockSizeState(color);
                setStateProduct({
                  size: null,
                  color: color.color,
                  totalStock: 0,
                  stockSizeId: null,
                  price: 0,
                  quantity: 1,
                });
              }}
            >
              <Image
                src={`${RESOURCE_API}${color?.images[index]}`}
                resizeMode="stretch"
                className={`${stockSizeState?.color === color.color && "border-2 border-purple-600"} w-16 h-24 rounded-lg`}
              />
              <Text className={"text-xs"}>{color.color}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text className={"text-md font-bold my-4"}>
          Beden Seçiniz:{" "}
          {sizeError && (
            <Text className={"text-red-600 text-xs"}>Lütfen beden Seçiniz</Text>
          )}
        </Text>
        <View className={"flex flex-row gap-x-4"}>
          {stockSizeState?.stockSize?.map((ss, index) => (
            <TouchableOpacity
              disabled={ss.stock <= 0}
              onPress={() => {
                if (ss.stock > 0) {
                  setStateProduct({
                    ...stateProduct,
                    stockSizeId: ss.id,
                    totalStock: ss.stock,
                    size: ss.size,
                    quantity: 1,
                  });
                }
              }}
              key={index}
              className={`${stateProduct.size === ss.size ? "border border-purple-500 bg-purple-500 text-purple-500" : "border"}
                                               ${ss.size.length > 2 ? "px-2" : "px-4"} ${ss.stock <= 0 && "line-through opacity-40"} py-2 flex items-center justify-center rounded-lg`}
            >
              <Text
                className={`${stateProduct.size === ss.size && "text-white"} ${ss.stock <= 0 && "line-through"} font-bold`}
              >
                {ss.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className={"flex items-center"}>
          <View
            className={
              "mt-8 flex flex-row items-center w-3/4 justify-between border rounded-lg p-4"
            }
          >
            <TouchableOpacity
              disabled={stateProduct?.quantity <= 1}
              onPress={() =>
                stateProduct?.quantity > 1
                  ? setStateProduct({
                      ...stateProduct,
                      quantity: stateProduct.quantity - 1,
                    })
                  : null
              }
            >
              <AntDesign
                name="minuscircleo"
                size={32}
                color={color.mainColor}
              />
            </TouchableOpacity>
            <Text
              className={"text-2xl font-medium"}
              style={{ color: color.mainColor }}
            >
              {stateProduct.quantity}
            </Text>
            <TouchableOpacity

              disabled={stateProduct?.quantity >= stateProduct?.totalStock}
              onPress={() =>
                stateProduct?.quantity < stateProduct?.totalStock
                  ? setStateProduct({
                      ...stateProduct,
                      quantity: stateProduct.quantity + 1,
                    })
                  : null
              }
            >
              <AntDesign name="pluscircleo" size={32} color={color.mainColor}  />
            </TouchableOpacity>
          </View>
        </View>

        <View className={"flex flex-row mt-8 w-full justify-between"}>
          <TouchableOpacity
            className={"w-52 py-3 rounded"}
            style={{ backgroundColor: color.mainColor }}
          >
            <Text className={"text-white font-bold text-lg text-center w-full"}>
              Şimdi Al
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (stateProduct.size != null) {
                addCart();
                setSizeError(false);
              } else {
                setSizeError(!sizeError);
                Toast.show({ type: "error", text1: "Lütfen Beden Seçiniz !" });
              }
            }}
            className={"w-52 border py-3 rounded"}
          >
            <Text className={"font-bold text-lg text-center w-full"}>
              Sepete Ekle
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`flex flex-col gap-y-4 mt-6`}
          style={{ marginBottom: Platform.OS === "ios" ? "10%" : "30%" }}
        >
          <Text className={"font-bold text-xl"}>Ürün Açıklaması:</Text>
          <RenderHTML contentWidth={width} source={{html: product?.description || ""}} />
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    padding: 10,
    alignItems: "center",
  },
  thumbnailList: {
    maxHeight: width * 0.7,
    height: width * 0.7,
  },
  thumbnail: {
    width: 40,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
