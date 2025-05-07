import { getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

// Sepet Tipi
export interface CartState {
  homeSliderImages: [];
  loading: boolean;
  openCartModal: boolean;
  authModal: boolean;
}

// Başlangıç durumu (initialState)
const initialState: CartState = {
  homeSliderImages: [],
  loading: false,
  openCartModal: false,
  authModal: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    getHomeSliders: (state, action) => {
      state.homeSliderImages = action.payload;
    },
    changeAuthModal: (state) => {
      state.authModal = !state.authModal;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    handleOpenCartModal: (state) => {
      state.openCartModal = !state.openCartModal;
    }
  },
});

export const getAllHomeSliderImages = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "slider" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getHomeSliders(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      Toast.show({type: "error", text1:err.response.data});
    });
};


export const {
  getHomeSliders,
  loading ,
    handleOpenCartModal,
    changeAuthModal
} = generalSlice.actions;

export default generalSlice.reducer;
