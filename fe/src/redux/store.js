import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, PERSIST, PURGE } from "redux-persist";
// import logger from "redux-logger";

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
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
  // }).concat(logger),
});
