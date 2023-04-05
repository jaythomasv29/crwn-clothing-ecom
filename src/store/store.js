/**
 * Where State Lives and where recieve and dispatch Actions and where the state is updated
 */
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

// Redux Persist to persist data in local storage
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// Bring in root reducer
import { rootReducer } from "./root-reducer";

import logger from "redux-logger";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "products"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Only logger when in development
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// create store along with logger with persistedReducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
