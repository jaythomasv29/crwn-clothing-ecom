import { UserAction } from "./user.action";
import { USER_ACTION_TYPES  } from "./user.types";
import { User} from "firebase/auth"


const USER_INITIAL_STATE: UserState = {
  currentUser: null
}



export type UserState = {
  currentUser: User | null;
}


export const userReducer = (state = USER_INITIAL_STATE, action = {} as UserAction) => {

  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    default:
      return state;
  }
}