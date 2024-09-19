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
    getProCatBrandSuccess: (state, {payload}) => {
      state.loading = false;
      state.products = payload[0]
      state.categories = payload[1]
      state.brands = payload[2]
    },
    getFirmBrandProPurSuccess: (state, {payload}) => {
      state.loading = false;
      state.firms = payload[0]
      state.brands = payload[1]
      state.products = payload[2]
      state.purchases = payload[3]
    }
  },
});

export const {
  fetchStart,
  fetchFail,
  getStockSuccess,
  getProCatBrandSuccess,
  getFirmBrandProPurSuccess,
} = stockSlice.actions;
export default stockSlice.reducer;
