import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { editUserDetailsDispatch } from "@/store/userSlice";
import { color } from "@/constants/colors";
import FormInput from "@/components/FormInput";

function UserDetail() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { session, user } = useAuth();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      address: "",
      token: session,
      email: user?.email,
    },
    onSubmit: (values) => {
      dispatch(editUserDetailsDispatch(values, setOpen))
    },
  });

  return (
    <View
      className={
        "flex flex-col gap-y-3 bg-white mt-4 w-full p-3 rounded-lg border border-gray-300"
      }
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{ position: "absolute", right: 7, top: 7 }}
      >
        <Feather name="edit" size={24} color="blue" />
      </TouchableOpacity>
      <View className={"flex flex-row gap-x-4 items-center"}>
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={24}
          color="black"
        />
        <Text>{user?.nameSurname}</Text>
      </View>

      <View className={"flex flex-row gap-x-4 items-center"}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text>{user?.email}</Text>
      </View>

        {
            open ? (
                <FormInput name={'phoneNumber'} formik={formik} placeholderName={'Yeni Telefon'} />
            ): (
                <View className={"flex flex-row gap-x-4 items-center"}>
                    <Entypo name="phone" size={24} color="black" />
                    <Text>{user?.phoneNumber}</Text>
                </View>
            )
        }

        {
            open ? (
                <FormInput name={'address'} formik={formik} placeholderName={'Yeni Adres'} />
            ): (
                <View className={"flex flex-row gap-x-4 items-center w-80"}>
                    <Entypo name="address" size={24} color="black" />
                    <Text style={{ fontSize: 12 }}>{user?.address}</Text>
                </View>
            )
        }

        {
            open && (
                <TouchableOpacity
                    onPress={()=> formik.handleSubmit()}
                    style={{ padding: 10, backgroundColor: color.mainColor, borderRadius:10, marginTop:5 }}
                >
                    <Text className={"text-white text-center"}>Güncelle</Text>
                </TouchableOpacity>
            )
        }
    </View>
  );
}

export default UserDetail;
