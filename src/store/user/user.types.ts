export enum USER_ACTION_TYPES {
  SET_CURRENT_USER= "SET_CURRENT_USER"
}


export enum ACCOUNT_TYPES {
  ADMIN="ADMIN",
  USER="USER"
}


export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  accountType?: string;
}

export type AdditionalUser = {
  accountType?: string
} & User