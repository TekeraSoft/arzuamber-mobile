import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Tabs, useRouter} from "expo-router";
import {
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { color } from "@/constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { handleOpenCartModal } from "@/store/generalSlice";
import React, {useEffect} from "react";
import Cart from "@/components/utils/Cart";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {getAllFavorites} from "@/store/favoritesSlice";
import {useAuth} from "@/context/AuthContext";

export default function TabLayout() {
  const { t }: { t: (type: string) => string } = useTranslation();
  const router = useRouter();
  const {loading, session, user} = useAuth()
    const {favorites} = useSelector((state:RootState)=> state.favs)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!loading && session) {
            dispatch(getAllFavorites(user?.userId));
        }
    }, [loading, session, user?.userId]);

  const viewStyle = (props) => {
    return {
      backgroundColor: props.focused ? color.mainColorDark : "transparent",
      borderRadius: 50,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    };
  };

  return (
    <Tabs
      screenOptions={{
          tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "white",
        headerStyle: { backgroundColor: color.mainColor },
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        tabBarStyle: {
            height:55,
            paddingTop:5,
            backgroundColor: color.mainColor,
            marginHorizontal:15,
            position:'absolute',
            marginBottom:12,
            borderRadius: 50
        },
        title: "ARZUAMBER",
        headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 24 },

        header: () => (
          <View
            style={{ backgroundColor: color.mainColor }}
            className={
              "h-28 w-full flex flex-row items-center pt-16 justify-between px-4"
            }
          >
            <Text className={"text-white font-bold text-2xl"}>ARZUAMBER</Text>
            <View className={"flex flex-row items-center gap-x-4"}>
                {session ?  <TouchableOpacity
                    onPress={() => dispatch(handleOpenCartModal())}
                    className={"gap-x-8 mr-3 relative"}
                >
                    <MaterialCommunityIcons
                        name="heart-multiple-outline"
                        size={28}
                        color="white"
                    />
                    <View className="bg-pink-500 w-5 h-5 rounded-full items-center justify-center absolute -right-2 -top-2">
                        <Text className="text-white text-xs">{favorites?.length}</Text>
                    </View>
                </TouchableOpacity> : null}
              <Cart />
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (props) => {
            return (
              <View style={viewStyle(props)}>
                <Text
                  style={{
                    color:'white',
                      fontWeight:'bold',
                      fontSize:28,
                  }}
                >
                  A
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: t("product"),
          tabBarIcon: (props) => (
            <View style={viewStyle(props)}>
              <MaterialIcons
                name="manage-search"
                size={34}
                color={'white'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: (props) => (
            <View style={viewStyle(props)}>
                <FontAwesome6 name="contact-book" size={28} color="white" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: (props) => (
            <View style={viewStyle(props)}>
              <FontAwesome6
                name="user"
                size={28}
                color={'white'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
