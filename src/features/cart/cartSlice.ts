import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";
// ch helper
// const url = "https://course-api.com/react-useReducer-cart-project";
const url = "https://course-api.com/react-useReducer-cart-project";

interface CartState {
  cartItems: {
    id: string;
    title: string;
    price: number;
    amount: number;
    img: string;
  }[];
  amount: number;
  total: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  loading: "idle",
  error: "",
} as CartState;

export const getCartItemsById: any = createAsyncThunk(
  "cart/getCartItems",
  async (id, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios.get(url + "/" + id);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const CreateCartItem: any = createAsyncThunk(
  "cart/createCartItem",
  async (data, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios.post(url, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id !== itemId
      );
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item: any) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item: any) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  /*  extraReducers: {
    [getCartItems.pending]: (state: any) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state: any, action: any) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems.push(action.payload);
    },
    [getCartItems.rejected]: (state: any, action: any) => {
      console.log(action);
      state.isLoading = false;
    }, */
  extraReducers: (builder) => {
    /*   builder.addCase(getCartItemsById.idle, (state, action) => {
      state.loading = "idle";
    });
    builder.addCase(getCartItemsById.pending, (state, action) => {
      state.loading = "pending";
    }); */
    builder.addCase(getCartItemsById.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.cartItems.push(action.payload);
      state.loading = "succeeded";
    });
    /*   builder.addCase(getCartItemsById.rejected, (state, action) => {
      state.loading = "failed";
      state.error = "something went wrong ";
    }); */
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
