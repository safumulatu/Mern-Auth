import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage, // corrected from 'Storage' to 'storage'
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To ignore errors when serializing state
    }),
});

export const persistor = persistStore(store);
