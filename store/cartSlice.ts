import { createSlice } from "@reduxjs/toolkit";
import { postGuardRequest } from "@/services/requestservice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ürün Tipi
// Ürün Tipi
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

// Başlangıç state'i (senkron!)
const initialState = {
  cartProducts: [] as CartItem[],
  total: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCartFromStorage: (state, action) => {
      state.cartProducts = action.payload.cartProducts;
      state.total = action.payload.total;
    },
    // Sepete ürün ekleme işlemi
    addToCart: (state, action) => {
      state.loading = true;
      const { size, color, id, quantity } = action.payload;
      const existingProduct = state.cartProducts.find(
        (p) => p.id === id && p.color === color && p.size === size,
      );
      if (existingProduct) {
        existingProduct.quantity = quantity;
        state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      } else {
        state.cartProducts.push(action.payload);
        state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      }
      state.loading = false;
    },

    //Sepetten ürün silme işlemi
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
          (item) =>
              !(
                  item.id === action.payload.id &&
                  item.color === action.payload.color &&
                  item.size === action.payload.size
              )
      );
      state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
      );
    },

    // Tüm sepeti temizleme
    clearCart: (state) => {
      state.cartProducts = [];
      state.total = 0;
    },
  },
});

export const rehydrateCart = () => async (dispatch) => {
  try {
    const savedCart = await AsyncStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(
          setCartFromStorage({
            cartProducts: parsedCart.cartProducts || [],
            total: parsedCart.total || 0,
          })
      );
    }
  } catch (error) {
    console.error("Cart rehydrate failed:", error);
  }
};

export const addToCartAsync = (item) => async (dispatch, getState) => {
  dispatch(addToCart(item));
  const { cart } = getState(); // güncel state'i al
  await AsyncStorage.setItem(
      "cart",
      JSON.stringify({
        cartProducts: cart.cartProducts,
        total: cart.total,
      }),
  );
};

export const removeFromCartAsync = (item: CartItem) => async (dispatch, getState) => {
  dispatch(removeFromCart(item));
  const { cart } = getState();
  await AsyncStorage.setItem(
      "cart",
      JSON.stringify({
        cartProducts: cart.cartProducts,
        total: cart.total,
      })
  );
};

export const clearCartAsync = () => async (dispatch) => {
  dispatch(clearCart());
  await AsyncStorage.removeItem("cart");
};

export const addToCartNotification = (value: object) => async (dispatch) => {
  postGuardRequest({ controller: "product", action: "add-to-cart" }, value);
};

// Reducer'ları dışa aktarma
export const {
  addToCart, removeFromCart,
  clearCart ,
  setCartFromStorage} = cartSlice.actions;

export default cartSlice.reducer;
