import { createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { User } from "../../types";

interface IUser {
  token: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  token: "",
  isLoggedIn: false,
};

const user = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("team-token", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("team-token");
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
