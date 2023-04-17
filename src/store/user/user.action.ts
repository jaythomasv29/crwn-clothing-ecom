import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES, User } from "./user.types";

export type UserAction = ActionWithPayload<USER_ACTION_TYPES, User>

/*
 Action functions tigger an update in state to the store to update specific state based on a reducer
*/
// Action Creators that returns an object, that has a { type, payload}
export const setCurrentUser = withMatcher((user: User): UserAction => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
