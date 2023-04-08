import { User } from "firebase/auth";
import { RootState } from "../root-reducer";
// import { UserState } from "./user.reducer";
export const selectCurrentUser = (state: RootState): User | null => state.user.currentUser;
