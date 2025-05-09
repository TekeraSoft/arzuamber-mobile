import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {router, useNavigation, useRouter} from "expo-router";
import {RESOURCE_API} from "@/config";
import {AntDesign} from "@expo/vector-icons";
import {color} from "@/constants/colors";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {addFavoritesDispatch} from "@/store/favoritesSlice";
import {useAuth} from "@/context/AuthContext";
import Toast from "react-native-toast-message";

const {width, height} = Dimensions.get('window');
const cardMargin = 16; // toplam sağ/sol margin (8px + 8px)
const cardWidth = (width / 2) - cardMargin;

function Card({product}) {

    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const {user,session} = useAuth()

    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`detail/${product.slug}`);
            }}
            style={{
                width: cardWidth,
                backgroundColor: 'white',
                zIndex:-1
            }}
        >
            <Image
                source={{ uri: `${RESOURCE_API}${product?.colorSize[0].images[0]}` }}
                style={{ width: '100%', height: height * 0.36, borderRadius: 8 }}
                resizeMode="cover"
            />
            {/* Beğen Butonu */}
            <TouchableOpacity
                onPress={() => {
                    if(!session) {
                        Toast.show({type:'info',text1:'Lütfen Giriş Yapınız !'})
                    }
                    dispatch(addFavoritesDispatch(user?.userId,product.id,product))
                }}
                style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 5,
                    top: 3,
                    borderRadius: 50,
                    zIndex: 999,
                    padding: 8, // dokunma alanını artırmak için
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // hata olmasın diye
            >
                <AntDesign name="hearto" size={24} color={color.mainColorDark} />
            </TouchableOpacity>
            <Text style={{ color: '#4B5563', fontSize: 14, paddingTop: 4, paddingBottom: 8 }}>
                {product.name.length >= 30 ? `${product.name.slice(0, 40)}...` : product.name}
            </Text>
            <View className={'flex flex-row items-center gap-x-4 justify-start pt-2'}>
                {
                    product.discountPrice !== 0 ? (
                        <>
                            <Text className={'font-medium text-green-600 text-md'}>
                                {product.discountPrice.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY',
                                })}
                            </Text>
                            <Text className={'font-medium text-md line-through'}>
                                {product.price.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY',
                                })}
                            </Text>
                        </>
                    ): (
                        <Text className={'font-medium text-md'}>
                            {product.price.toLocaleString('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                            })}
                        </Text>
                    )
                }

            </View>
        </TouchableOpacity>
    );
}

export default Card;