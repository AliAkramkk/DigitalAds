import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptionPlan: null, // Stores the active subscription plan
  adsRemaining: 0, // How many ads they can post
  daysRemaining: 0, // Days left before subscription expires
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscriptionPlan = action.payload.planType; // was `plan` before
      state.adsRemaining = action.payload.adLimit; // was `ads` before
      const expiry = new Date(action.payload.subscriptionExpiry);
      const now = new Date();
      const diff = Math.max(0, Math.floor((expiry - now) / (1000 * 60 * 60 * 24)));
      state.daysRemaining = diff;
    },
    decrementAds: (state) => {
      if (state.adsRemaining > 0) {
        state.adsRemaining -= 1;
      }
    },
    resetSubscription: (state) => {
      state.subscriptionPlan = null;
      state.adsRemaining = 0;
      state.daysRemaining = 0;
    },
  },
});

export const { setSubscription, decrementAds, resetSubscription } = paymentSlice.actions;
export default paymentSlice.reducer;
