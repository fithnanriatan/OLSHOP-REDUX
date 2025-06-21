import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectedCartIndex = state.items.findIndex(
        (product) => product.id === newItem.id
      );

      if (selectedCartIndex !== -1) {
        const cartIndex = state.items[selectedCartIndex];
        cartIndex.quantity += 1;
        cartIndex.totalPrice = cartIndex.quantity * newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItemToCart: (state, action) => {
      const itemId = action.payload;
      const selectedCartIndex = state.items.findIndex(
        (product) => product.id === itemId
      );

      if (selectedCartIndex !== -1) {
        state.items.splice(selectedCartIndex, 1);
      }
    },
    plusQuantityToCart: (state, action) => {
      const itemId = action.payload;
      const selectedCartIndex = state.items.findIndex(
        (product) => product.id === itemId
      );

      if (selectedCartIndex !== -1) {
        const cartIndex = state.items[selectedCartIndex];
        cartIndex.quantity += 1;
        cartIndex.totalPrice = cartIndex.quantity * cartIndex.price;
      }
    },
    minusQuantityToCart: (state, action) => {
      const itemId = action.payload;
      const selectedCartIndex = state.items.findIndex(
        (product) => product.id === itemId
      );

      if (selectedCartIndex !== -1) {
        const cartIndex = state.items[selectedCartIndex];
        if (cartIndex.quantity > 1) {
          cartIndex.quantity -= 1;
          cartIndex.totalPrice = cartIndex.quantity * cartIndex.price;
        } else {
          state.items.splice(selectedCartIndex, 1);
        }
      }
    },
  },
});

export const { addItemToCart, removeItemToCart, plusQuantityToCart, minusQuantityToCart } = cartSlice.actions;

export default cartSlice;

// selector
export const selectCartItems = state => state.cart.items;
export const selectCartItemsCount = state => state.cart.items.length
export const selectCartItemCount = state => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrice = state => state.cart.items.reduce((total, item) => total + item.totalPrice, 0)