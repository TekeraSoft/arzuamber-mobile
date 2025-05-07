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
    addFavorites: (state, action) => {
        state.favorites.push(action.payload.product);
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

export const addFavoritesDispatch =
    (userId: string, productId: string,product:object) => async (dispatch) => {
      dispatch(loading(true));
      getGuardRequest({
        controller: "user",
        action: "add-favorite-product",
        params: { userId: userId, productId: productId },
      })
          .then((res) => {
            dispatch(loading(false));
            if (!res.data.success) {
                Toast.show({type: "error", text1:res.data?.message});
            } else {
                dispatch(addFavorites({product: product}))
            }
          })
          .catch((err) => {
            dispatch(loading(false));
          });
    };

export const deleteToFav =
  (productId: string, userId: string) => async (dispatch) => {
    dispatch(loading(true));
    deleteGuardRequest({
      controller: "user",
      action: "remove-favorite",
      params: { productId: productId, userId: userId },
    })
      .then((res) => {
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
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// Reducer'ları dışa aktarma
export const {
  getAllFavoritesDispatch,
  deleteFavorite,
  addFavorites,
  loading,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
