import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductCard } from "@repo/shared";

export interface ICartItem extends IProductCard {
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: ICartState = { items: [], totalAmount: 0, totalItems: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProductCard>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
    hydrateCart: (state, action: PayloadAction<ICartState>) => {
      return action.payload; // Replace empty initial state with saved state
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  addToCart,
  hydrateCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
