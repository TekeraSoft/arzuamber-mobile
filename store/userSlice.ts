import { createSlice } from "@reduxjs/toolkit";
import {getGuardRequest, patchRequest, postGuardRequest} from "@/services/requestservice";
import Toast from "react-native-toast-message";

// Başlangıç state
const initialState = {
  orders: [],
  loading: false,
};

// Slice oluştur
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const getUserOrdersDispatch = (email: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "order",
    action: "get-user-orders",
    params: { email: email },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getOrders(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      Toast.show({type: "error", text1:err.response.data});
    });
};

export const forgotPasswordDispatch = (email:string,token:string,password:string,router) => async (dispatch) => {
  dispatch(loading(true));

  postGuardRequest({controller:'user',action:'change-forgot-password',params:{mail:email,token:token,password:password}}).then((res)=> {
    dispatch(loading(false));
    router.push('/');
    Toast.show({type: "success", text1:res.data.message});
  }).catch(err=> {
    Toast.show({type: "error", text1:err.response.data});
    dispatch(loading(false));
  }).finally(()=> {
    dispatch(loading(false));
  })
}

export const changePasswordDispatch = (value:object,resetForm) => async (dispatch) => {
  dispatch(loading(true));
  patchRequest({controller:'user',action:'change-password',params:{
    email:value.email,
      password:value.password,
      oldPassword:value.oldPassword,
      token: value.token
    }}).then((res)=> {
    dispatch(loading(false));
    Toast.show({type: "success", text1:res.data.message});
    resetForm()
  }).catch(err=> {
    dispatch(loading(false));
    Toast.show({type: "error", text1:err.response.data});
  })
}

export const editUserDetailsDispatch = (values: object,resetForm) => async (dispatch) => {
  dispatch(loading(true));
  await patchRequest({controller: 'user', action: 'edit-user-details'}, values).then((res)=> {
    dispatch(loading(false));
    Toast.show({type: "success", text1:res.data.message});
    resetForm()
  }).catch(err=> {
    dispatch(loading(false));
    Toast.show({type: "error", text1:err.response.data});
  })
}

export const createContactDispatch = (values: object, resetForm) => async (dispatch) => {
  dispatch(loading(true));
  postGuardRequest({controller:'contact'},values).then((res)=> {
    dispatch(loading(false));
    resetForm()
    Toast.show({type: "success", text1:res.data.message});
  }).catch(err=> {
    dispatch(loading(false));
    Toast.show({type: "error", text1:err.response.data});
  })
}

export const { getOrders, loading } = userSlice.actions;
export default userSlice.reducer;
