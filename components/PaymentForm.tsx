import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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

const { width, height } = Dimensions.get("window");

function PaymentForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { total } = useSelector((state: RootState) => state.cart);
  const [paymentType, setPaymentType] = React.useState("CREDIT_CARD");
  const [loading, setLoading] = useState(false);
  const [openBillingAddress, setOpenBillingAddress] = useState<boolean>(false);
  const [basketItems, setBasketItems] = useState([]);
  const router = useRouter();
  const [openCityDropdown, setOpenCityDropdown] = useState<boolean>(false);
  const [openStateDropdown, setOpenStateDropdown] = useState<boolean>(false);
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

  const _handleSubmit = async (values) => {
    setLoading(true);
    if (paymentType === "CREDIT_CARD") {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/order/pay`, {
          ...values,
          shippingAddress: {
            ...values.shippingAddress,
            contactName: values.buyer.name,
          },
          billingAddress: openBillingAddress
            ? { ...values.billingAddress, contactName: values.buyer.name }
            : { ...values.shippingAddress, contactName: values.buyer.name },
          buyer: {
            ...values.buyer,
            ip: "111.111.1.1",
            registrationAddress: values.shippingAddress.address,
            city: values.shippingAddress.city,
            country: values.shippingAddress.country,
          },
          ...(paymentType === "CREDIT_CARD" && {
            paymentCard: {
              ...values.paymentCard,
              cardNumber: values.paymentCard.cardNumber.replace(/\D/g, ""),
            },
          }),
          basketItems: basketItems,
          shippingPrice:
            total > filterData.maxShippingPrice ? 0 : filterData.shippingPrice,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setLoading(false);
            //setThreeDsModal(res.data.htmlContent);
            // sendWhatsappMessage(values.buyer.gsmNumber, basketItems);
          } else {
            Toast.show({ type: "error", text1: res.data.errorMessage });
          }
        })
        .catch((err) => {
          setLoading(false);
          Toast.show({ type: "error", text1: err.response.data });
        })
        .finally(() => setLoading(false));
    } else {
      // @ts-ignore
      dispatch(
        createPayAtDoor(
          {
            shippingAddress: {
              ...values.shippingAddress,
              contactName: values.buyer.name,
            },
            billingAddress: openBillingAddress
              ? {
                  ...values.billingAddress,
                  contactName: values.buyer.name,
                }
              : {
                  ...values.shippingAddress,
                  contactName: values.buyer.name,
                },
            buyer: {
              ...values.buyer,
              ip: "111.111.1.1",
              registrationAddress: values.shippingAddress.address,
              city: values.shippingAddress.city,
              country: values.shippingAddress.country,
            },
            basketItems: basketItems,
            shippingPrice:
              total > filterData.maxShippingPrice
                ? 0
                : filterData.shippingPrice,
          },
          router,
        ),
      );
    }
  };

  return (
    <ScrollView style={{ marginTop: 10, paddingHorizontal:10 }} nestedScrollEnabled={true} contentContainerStyle={{paddingBottom:100}}>
      <View className={"flex flex-row items-center justify-around"}>
        <TouchableOpacity
          onPress={() => setPaymentType("CREDIT_CARD")}
          className={`${paymentType === "CREDIT_CARD" ? "bg-purple-500" : "bg-transparent"} flex flex-col items-center justify-center border border-purple-500 rounded-lg p-3`}
          style={{ width: 170 }}
        >
          <Image
            source={require("../assets/icons/pay-card-ico.png")}
            width={40}
            height={40}
          />
          <Text
            className={`${paymentType === "CREDIT_CARD" ? "text-white" : "text-black"}`}
          >
            Kredi Kartı ile Öde
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPaymentType("PAY_AT_DOOR")}
          className={`${paymentType === "PAY_AT_DOOR" ? "bg-purple-500" : "bg-transparent"} flex flex-col items-center justify-center border border-purple-500 rounded-lg p-3`}
          style={{ width: 170 }}
        >
          <Image
            source={require("../assets/icons/pay-at-door-ico.png")}
            style={{ width: 38, height: 38 }}
          />
          <Text
            className={`${paymentType === "PAY_AT_DOOR" ? "text-white" : "text-black"}`}
          >
            Kapıda Öde
          </Text>
        </TouchableOpacity>
      </View>
      {/* FORM */}
      <View className={"flex flex-col mt-4"}>
        <View className={"flex flex-row items-center gap-x-2 justify-between"}>
          <FormInput
              name="buyer.name"
              placeholderName="Ad"
              formik={formik}
          />
          <FormInput
            placeholderName="Soyad"
            name='buyer.surname'
            formik={formik}
          />
        </View>
        <FormInput
          placeholderName="E-mail"
          name="buyer.email"
          formik={formik}
        />
        <FormInput
          keyboardType={"number-pad"}
          name="buyer.gsmNumber"
          placeholderName="Telefon"
          formik={formik}
        />
        <View
          className={"flex flex-row items-center gap-x-2 justify-between mb-2"}
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
              listMode="MODAL" // veya "MODAL" veya "FLATLIST"
              mode={"BADGE"}
              badgeDotColors={[
                "#e76f51",
                "#00b4d8",
                "#e9c46a",
                "#e76f51",
                "#8ac926",
                "#00b4d8",
                "#e9c46a",
              ]}
              zIndex={1000}
              style={{ backgroundColor: "transparent", borderColor: "gray" }}
              placeholder={"Şehir Seçiniz"}
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
              mode={"BADGE"}
              badgeDotColors={[
                "#e76f51",
                "#00b4d8",
                "#e9c46a",
                "#e76f51",
                "#8ac926",
                "#00b4d8",
                "#e9c46a",
              ]}
              listMode="MODAL" // veya "MODAL" veya "FLATLIST"
              zIndex={1000}
              style={{ backgroundColor: "transparent", borderColor: "gray" }}
              placeholder={"Şehir Seçiniz"}
            />
          </View>
        </View>
        <FormInput
          placeholderName={"Detaylı Adres"}
          name="shippingAddress.address"
          formik={formik}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    </ScrollView>
  );
}

export default PaymentForm;
