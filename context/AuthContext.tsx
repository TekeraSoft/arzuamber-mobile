import {useContext, createContext, useState, useEffect} from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { color } from "@/constants/colors";
import { postGuardRequest } from "@/services/requestservice";
import { BACKEND_API } from "@/config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth()
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // JWT exp is in seconds

      if (decoded.exp < currentTime) {
        // Token expired
        await signOut();
        Toast.show({ type: "error", text1: "Oturum süreniz doldu, lütfen tekrar giriş yapın." });
        setLoading(false);
        return;
      }

      const user = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(user);

      setUser(parsedUser);
      setSession(token);
    } catch (error) {
      console.error("Auth check failed", error);
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }) => {
    setLoading(true);
    const responseToken = await axios
      .post(`${BACKEND_API}/auth/authenticate`, {
        email,
        password,
      })
      .then(async (res) => {
        const token = res.data.accessToken;
        setSession(token);
        await AsyncStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const { userId, role, email, phoneNumber, address, nameSurname } = decoded;
        const userData = {
          userId,
          role,
          email,
          phoneNumber,
          address,
          nameSurname
        };
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        Toast.show({type:'success',text1:'Giriş Başarılı'})
        setLoading(false);
      })
      .catch((err) => {
        Toast.show({ type: "error", text1: err.response.data });
      }).finally(()=> {
        setLoading(false);
        })
  };
  const signOut = async () => {
    setLoading(true)
    await AsyncStorage.removeItem('token')
    setSession(null)
    setUser(null);
  };

  const contextData = { session, user, signIn, signOut };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
