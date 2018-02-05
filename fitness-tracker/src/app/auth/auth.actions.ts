import {Action} from "@ngrx/store";

export const SET_AUTHTENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHTENTICATED = '[Auth] Set UnAuthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHTENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAUTHTENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;
