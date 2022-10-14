import { UserProfileType } from "./../../../types/types";
import { AppState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface UserState {
  user: UserProfileType;
}

const initialState: UserState = {
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (
      state: UserState,
      action: PayloadAction<UserProfileType>
    ) => {
      state.user = action.payload;
    },
    resetUserProfile: (state: UserState) => {
      state.user = initialState.user;
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

export const { setUserProfile, resetUserProfile } = userSlice.actions;
export const selectUserProfile = (state: AppState) => state.user.user;

export default userSlice.reducer;
