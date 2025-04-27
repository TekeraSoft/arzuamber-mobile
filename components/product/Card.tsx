import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {router} from "expo-router";
import {RESOURCE_API} from "@/config";

const {width, height} = Dimensions.get('window');
const cardMargin = 16; // toplam sağ/sol margin (8px + 8px)
const cardWidth = (width / 2) - cardMargin;

function Card({product}) {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/detail/${product.slug}`);
            }}
            style={{
                width: cardWidth,
                backgroundColor: 'white',
            }}
        >
            <Image
                source={{ uri: `${RESOURCE_API}${product?.colorSize[0].images[0]}` }}
                style={{ width: '100%', height: height * 0.36, borderRadius: 8 }}
                resizeMode="cover"
            />
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