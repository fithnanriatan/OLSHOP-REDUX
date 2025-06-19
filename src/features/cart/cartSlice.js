import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
        console.log(action.payload);
    },
    removeItemToCart: () => {}
  },
});

export const { addItemToCart, removeItemToCart } = cartSlice.actions;

export default cartSlice