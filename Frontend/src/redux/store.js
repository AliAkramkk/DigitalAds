import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../features/authSlice";
import adsReducer from "../features/adsSlice"; // Import adsSlice

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  ads: adsReducer, // Add ads reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
