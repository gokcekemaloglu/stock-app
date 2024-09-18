import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    firms: [],
    brands: [],
    products: [],
    purchases: [],
    sales: [],
    categories: [],
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },    
    getStockSuccess: (state, {payload}) => {
      state.loading = false;
      state[payload.endpoint] = payload?.stock
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getStockSuccess,
} = stockSlice.actions;
export default stockSlice.reducer;
