export enum USER_ACTION_TYPES {
  SET_CURRENT_USER= "SET_CURRENT_USER"
}

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
}