import { getLocalToken, parseJwt } from "./../../../shared/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import Router from "next/router";
import { AppState } from "../../store";

interface AuthState {
  token: string;
  expirationTime: number;
}

interface AuthPayload {
  token: string;
  rememberMe: boolean;
}

const initialState: AuthState = {
  token: "",
  expirationTime: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthPayload>) => {
      const { token, rememberMe } = action.payload;
      state.token = token;
      if (rememberMe) {
        const localToken = localStorage.getItem("token");
        if (localToken !== token) {
          localStorage.setItem("token", token);
          console.log(parseJwt(token));
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration-time");
      }
    },
    logout: (state: AuthState) => {
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("expiration-time");
      Router.push("/log-in");
    },
  },
  // special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectToken = (state: AppState) =>
  state.auth.token || getLocalToken();

export default authSlice.reducer;
