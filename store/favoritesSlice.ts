import { deleteGuardRequest, getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState = {
  favorites: [],
  loading: false,
};

export const favoritesSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    getAllFavoritesDispatch: (state, action) => {
      state.favorites = action.payload;
    },
    updateFavoritesDispatch: (state, action) => {
      // Eğer aynı ürün daha önce eklenmişse tekrar ekleme (opsiyonel kontrol)
      const exists = state.favorites.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const deleteToFav =
  (productId: string, userId: string) => async (dispatch) => {
    dispatch(loading(true));
    deleteGuardRequest({
      controller: "user",
      action: "remove-favorite",
      params: { productId: productId, userId: userId },
    })
      .then((res) => {
        Toast.show({type:'success',text1: res.data?.message})
        dispatch(deleteFavorite(productId));
        dispatch(loading(false));
      })
      .catch((err) => {
        Toast.show({type: "error", text1:err.response?.data});
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getAllFavorites = (userId: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "user",
    action: "get-favorites-for-user",
    params: { userId: userId },
  })
    .then((res) => {
      dispatch(getAllFavoritesDispatch(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      Toast.show({type: "error", text1:err.response?.data});
      console.log(err);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// Reducer'ları dışa aktarma
export const {
  getAllFavoritesDispatch,
  deleteFavorite,
  updateFavoritesDispatch,
  loading,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
