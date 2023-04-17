/**
 * Where State Lives and where recieve and dispatch Actions and where the state is updated
 */
import {
  compose,
  applyMiddleware,
  Middleware,
  legacy_createStore as createStore,
} from "redux";

// Redux Persist to persist data in local storage
import { persistStore, persistReducer, PersistConfig } from "redux-persist";

import storage from "redux-persist/lib/storage";

// Bring in root reducer
import { rootReducer } from "./root-reducer";

import logger from "redux-logger";
import thunk from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  blacklist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
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
].filter((middleware): middleware is Middleware => Boolean(middleware));

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
