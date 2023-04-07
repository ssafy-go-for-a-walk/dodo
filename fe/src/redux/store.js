import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, PERSIST, PURGE } from "redux-persist";
// import logger from "redux-logger";

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
});
