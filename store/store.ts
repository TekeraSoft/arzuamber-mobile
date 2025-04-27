import {configureStore} from "@reduxjs/toolkit";
import productSlice from "@/store/productSlice";
import categorySlice from "@/store/categorySlice";
import {generalSlice} from "@/store/generalSlice";
import cartSlice from "@/store/cartSlice";
import filterSlice from "@/store/filterSlice";


export const store = configureStore({
    reducer: {
        product: productSlice,
        category: categorySlice,
        general: generalSlice.reducer,
        cart: cartSlice,
        productFilter: filterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;