// Düzenlenmiş PaymentForm.js
import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView, findNodeHandle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useFormik } from "formik";
import axios from "axios";
import { filterData } from "@/data/filterData";
import Toast from "react-native-toast-message";
import { createPayAtDoor } from "@/store/orderSlice";
import { useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import ilData from "../data/il.json";
import stateData from "../data/ilce.json";
import DropDownPicker from "react-native-dropdown-picker";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";

const { width } = Dimensions.get("window");

function PaymentForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { total } = useSelector((state: RootState) => state.cart);
  const [paymentType, setPaymentType] = useState("CREDIT_CARD");
  const [loading, setLoading] = useState(false);
  const [openBillingAddress, setOpenBillingAddress] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const router = useRouter();
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  const [openStateDropdown, setOpenStateDropdown] = useState(false);
  const [state, setState] = useState([]);
  const [selectedCityState, setSelectedCityState] = useState({
    city: "",
    state: "",
  });

  const handleSelectState = (il_id) => {
    const ilce = stateData.filter((s) => s.il_id === il_id);
    setState(ilce);
  };

  // @ts-ignore
  const formik = useFormik({
    initialValues: {
      paymentCard: {
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: "",
      },
      buyer: {
        id: Math.random().toString(36).substring(2, 15),
        name: "",
        surname: "",
        gsmNumber: "",
        email: "",
        identityNumber: "55555555555",
        ip: "",
        lastLoginDate: "2024-03-25 20:28:29",
        registrationDate: "2024-03-25 20:28:29",
      },
      shippingAddress: {
        city: null,
        state: null,
        country: "Turkey",
        address: "",
        street: "",
        zipCode: "",
      },
      billingAddress: {
        city: null,
        state: null,
        country: "Turkey",
        address: "",
        street: "",
        zipCode: "",
      },
    },
  });

  const _handleSubmit = async () => {
    console.log(formik.values);
  };

  return (
    <View style={{paddingHorizontal:10}}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={() => setPaymentType("CREDIT_CARD")}
          style={{
            backgroundColor:
              paymentType === "CREDIT_CARD" ? "#8b5cf6" : "transparent",
            borderColor: "#8b5cf6",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            width: 160,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/icons/pay-card-ico.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text
            style={{
              color: paymentType === "CREDIT_CARD" ? "white" : "black",
              marginTop: 5,
            }}
          >
            Kredi Kartı ile Öde
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPaymentType("PAY_AT_DOOR")}
          style={{
            backgroundColor:
              paymentType === "PAY_AT_DOOR" ? "#8b5cf6" : "transparent",
            borderColor: "#8b5cf6",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            width: 160,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/icons/pay-at-door-ico.png")}
            style={{ width: 38, height: 38 }}
          />
          <Text
            style={{
              color: paymentType === "PAY_AT_DOOR" ? "white" : "black",
              marginTop: 5,
            }}
          >
            Kapıda Öde
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FormInput
            name="buyer.name"
            placeholderName="Ad"
            formik={formik}
            containerStyle={{ flex: 1 }}
          />
          <FormInput
            name="buyer.surname"
            placeholderName="Soyad"
            formik={formik}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <FormInput
          name="buyer.email"
          placeholderName="E-mail"
          formik={formik}
        />
        <FormInput
          name="buyer.gsmNumber"
          placeholderName="Telefon"
          formik={formik}
          keyboardType="number-pad"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <View style={{ zIndex: 1000, width: width * 0.45 }}>
            <DropDownPicker
              open={openCityDropdown}
              value={selectedCityState.city}
              setOpen={setOpenCityDropdown}
              setValue={(callbackValue) => {
                setSelectedCityState({
                  ...selectedCityState,
                  city: callbackValue(),
                });
                const selectedCity = ilData.find(
                  (item) => item.name === callbackValue(),
                );
                handleSelectState(selectedCity?.id);
              }}
              items={ilData.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
              listMode="MODAL"
              mode="BADGE"
              placeholder="Şehir Seçiniz"
              style={{ borderColor: "gray",backgroundColor:'transparent' }}
            />
          </View>

          <View style={{ zIndex: 1000, width: width * 0.45 }}>
            <DropDownPicker
              disabled={state.length === 0}
              open={openStateDropdown}
              value={formik.values.shippingAddress.state}
              setOpen={setOpenStateDropdown}
              setValue={(val) =>
                formik.setFieldValue("shippingAddress.state", val())
              }
              items={state.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
              listMode="MODAL"
              mode="BADGE"
              placeholder="İlçe Seçiniz"
              style={{ borderColor: "gray",backgroundColor:'transparent' }}
            />
          </View>
        </View>

        <FormInput
            name="shippingAddress.street"
            placeholderName="Mahalle/Cadde"
            formik={formik}
            multiline
            numberOfLines={4}
        />
        <FormInput
          name="shippingAddress.address"
          placeholderName="Detaylı Adres"
          formik={formik}
          multiline
          numberOfLines={4}
        />

        {
          paymentType === 'CREDIT_CARD' && (
                <View className={'flex flex-col rounded-lg p-2'} style={{backgroundColor:'#e5e7eb',marginBottom:20}}>
                  <Text className={'text-xl font-bold text-center'}>Kart Bilgileri</Text>
                  <FormInput name="paymentCard.cardHolderName" formik={formik} placeholderName="Kart Sahibi" />
                  <FormInput name="paymentCard.cardNumber" formik={formik} placeholderName="Kart Numarası" />
                  <View className={'flex flex-row items-center gap-x-2 justify-between'}>
                    <FormInput name="paymentCard.expireMonth" formik={formik} placeholderName="Ay" containerStyle={{ flex: 1 }} />
                    <FormInput name="paymentCard.expireYear" formik={formik} placeholderName="Yıl" containerStyle={{ flex: 1 }} />
                    <FormInput name="paymentCard.cvc" formik={formik} placeholderName="CVC" containerStyle={{ flex: 1 }} />
                  </View>
                  <Image source={require('../assets/icons/iyzicoImages.png')} style={{width:'100%', height:25}}/>
                </View>
            )
        }

      </View>
      <TouchableOpacity onPress={_handleSubmit} style={{marginBottom:40}} className={"w-full bg-purple-500 flex items-center justify-center rounded-lg py-4 p-2"}>
        <Text className={"text-white font-bold"}>Alışverişi Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PaymentForm;
