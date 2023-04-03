/**
 * Where State Lives and where recieve and dispatch Actions and where the state is updated
 */
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

// Bring in root reducer
import { rootReducer } from "./root-reducer";

import logger from "redux-logger";

// const loggerMiddleware = (store) => (next) => (action) => {
//   if(!action.type) {
//     return next(action);
//   }
//   console.log(`Type ${action.type}`)
//   console.log(`Payload ${action.payload}`);
//   console.log(`currentState ${store.getState()}`)

//   next(action);
//   console.log("next state: ", store.getState())
// }


const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// create store along with logger
export const store = createStore(rootReducer, undefined, composedEnhancers);
