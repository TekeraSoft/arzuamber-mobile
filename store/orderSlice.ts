import { createSlice } from "@reduxjs/toolkit";
import { postGuardRequest } from "@/services/requestservice";
import Toast from "react-native-toast-message";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderLoading: false,
    },
    reducers: {
        loading: (state, action) => {
            state.orderLoading = action.payload;
        },
    },
});

export const createPayAtDoor = (value: object, router) => async (dispatch) => {
    dispatch(loading(true));
    postGuardRequest(
        { controller: "order", action: "create-pay-at-door-order" },
        value
    )
        .then((res) => {
            dispatch(loading(false));
            router.push("/tr/payment-success");
            Toast.show({type:'success',text1:res.data?.message});
        })
        .catch((err) => {
            dispatch(loading(false));
            Toast.show({type: "error", text1:err.response.data});
        });
};

export const { loading } = orderSlice.actions;
export default orderSlice.reducer;
