import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

/*
 Action functions tigger an update in state to the store to update specific state based on a reducer
*/
// Action Creators that returns an object, that has a { type, payload}
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
