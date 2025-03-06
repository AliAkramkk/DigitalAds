import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../features/authSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export const persistor = persistStore(store);
