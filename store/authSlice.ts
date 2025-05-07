import { postGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState = {
  errorState: "",
  user: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorState: (state, action) => {
      state.errorState = action.payload;
    },
      discardErrorState: (state, action) => {
        state.errorState = ""
      }
  },
});

export const registerUserDispatch =
  (value: object, resetForm: () => void) =>
  async (dispatch) => {
    postGuardRequest({ controller: "auth", action: "register" }, value)
      .then((res) => {
        Toast.show({type: "success", text1: res.data.message});
        resetForm();
      })
      .catch((err) => {
        dispatch(setErrorState(err.response.data));
      });
  };

// Reducer'ları dışa aktarma
export const { setErrorState ,discardErrorState} = authSlice.actions;
export default authSlice.reducer;
