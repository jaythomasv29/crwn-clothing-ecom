/**
 * Where State Lives and where recieve and dispatch Actions and where the state is updated
 */
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";

// Bring in root reducer
import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// create store along with logger
export const store = createStore(rootReducer, undefined, composedEnhancers);
