import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: [], // Stores uploaded ads
  loading: false,
  error: null,
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
      state.ads.push(action.payload); // Add new ad to list
    },
    uploadAdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAdStatus: (state, action) => {
      const { id, status } = action.payload;
      const adIndex = state.ads.findIndex((ad) => ad.id === id);
      if (adIndex !== -1) {
        state.ads[adIndex].status = status; // Update ad approval status
      }
    },
    clearAds: (state) => {
      state.ads = [];
    },
  },
});

export const { 
  uploadAdRequest, 
  uploadAdSuccess, 
  uploadAdFailure, 
  updateAdStatus,
  clearAds 
} = adsSlice.actions;
export default adsSlice.reducer;
