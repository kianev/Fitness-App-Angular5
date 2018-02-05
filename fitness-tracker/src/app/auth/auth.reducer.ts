import { Action } from '@ngrx/store';

import {AuthActions, SET_AUTHTENTICATED, SET_UNAUTHTENTICATED} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHTENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHTENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
