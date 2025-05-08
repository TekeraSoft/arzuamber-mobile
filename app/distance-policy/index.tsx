import React from 'react';
import {ScrollView, Text, View} from 'react-native';

function DistancePolicy() {
    return (
        <ScrollView
            contentContainerStyle={{ marginHorizontal: 10, paddingBottom: 60 }}
        >
            <View className={"flex flex-col gap-y-3"}>
                <Text className={"text-xl font-bold text-center"}>
                    İptal ve İade Politikası
                </Text>
                <Text className={"text-xs"}>
                    www.arzuamber.com adresinden satın almış olduğunuz ürünlerin
                    kullanılmamış olması şartıyla değişim süresi fatura tarihinden
                    itibaren 14 GÜN'dür. İade ve değişim yapabilmeniz için ürünlerin
                    GİYİLMEMİŞ, DEFORME OLMAMIŞ, ETİKETLERİ KOPARTILMAMIŞ, KULLANILABİLME
                    ÖZELLİĞİNİ KAYBETMEMİŞ olması gerekmektedir. Kolay iade talebi
                    oluşturup WhatsApp hattımıza yazıp KARGO KODUNU bekleyiniz. İndirimli
                    ürünler en dip fiyatlarda satışta olduğu için iade yoktur, değişim
                    vardır. Değişim yapmak istediğiniz takdirde +90-534-260-8385 WhatsApp
                    hattımızdan iletişime geçerek destek ve talep oluşturabilirsiniz.
                    İadelerde kargo ücretleri siz müşterilerimize aittir (100 TL kargo
                    ücreti). İade için gönderdiğiniz ürün firmamıza geldikten sonra
                    kontrol edilip sizlere dönüş sağlanıp aldığınız ürünün ücret iadesi
                    yapılacaktır. İade şartları için WhatsApp hattımıza yazmanız
                    yeterlidir. Ürünlerimiz kalite kontrolden geçmektedir. Nadiren de olsa
                    defolu gönderilmiş ürünler için +90-534-260-8385 WhatsApp hattımızdan
                    iletişime geçerek yanlış veya defolu gönderilen ürünün görselini
                    atmanızı rica ederiz.
                </Text>
            </View>
        </ScrollView>
    );
}

export default DistancePolicy;