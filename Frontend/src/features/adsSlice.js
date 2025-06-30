import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  ads: [],
  loading: false,
  error: null,
  remainingFreeAds: 2, // Default free ads limit
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    uploadAdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadAdSuccess: (state, action) => {
      state.loading = false;
      state.ads.push(action.payload);
      if (state.remainingFreeAds > 0) {
        state.remainingFreeAds -= 1;
      }
    },
    uploadAdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFreeAdLimit: (state, action) => {
      state.remainingFreeAds = action.payload;
    },
  },
});

export const { uploadAdRequest, uploadAdSuccess, uploadAdFailure, setFreeAdLimit } = adsSlice.actions;

export const checkFreeAdLimit = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get("/customer/free-ads");
    console.log("Remaining free ads data:", data);
    
    dispatch(setFreeAdLimit(data.remainingFreeAds));
  } catch (error) {
    console.error("Error fetching free ads:", error);
  }
};

export default adsSlice.reducer;
