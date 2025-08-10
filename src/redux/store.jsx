import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from "./slice/passwordSlice";
import productReducer from "./slice/productsSlice";
import userReducer from "./slice/userSlice";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "userStorage",
  storage: storageSession,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    passwordStore: passwordReducer,
    productStore: productReducer,
    userStore: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
