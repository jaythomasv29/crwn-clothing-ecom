import { UserAction, setCurrentUser } from "./user.action";
import { User } from "firebase/auth"


const USER_INITIAL_STATE: UserState = {
  currentUser: null
}



export type UserState = {
  currentUser: User | null;
}


export const userReducer = (state = USER_INITIAL_STATE, action: UserAction) => {
  if (setCurrentUser.match(action)) {
    return { ...state, currentUser: action.payload }
  }
  return state;
}