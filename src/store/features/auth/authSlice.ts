import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import Router from "next/router";
import { AppDispatch, AppState } from "../../store";

interface AuthState {
  token: string;
}

interface AuthPayload {
  token: string;
  rememberMe: boolean;
}

const initialState: AuthState = {
  token: "",
};

const loginAndRedirect = (action: PayloadAction<AuthPayload>) => {
  return (dispatch: AppDispatch) => {
    dispatch(login(action.payload));
  };
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
        }
      } else {
        localStorage.removeItem("token");
      }
    },
    logout: (state: AuthState) => {
      state.token = "";
      localStorage.removeItem("token");
      Router.push("/log-in");
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
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

export const selectToken = (state: AppState) => state.auth.token;

export default authSlice.reducer;