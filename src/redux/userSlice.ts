import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload, StorageKey } from "../helpers/type";
import Storage from "../helpers/Storage";

const initialState: AuthPayload = {} as any;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthPayload>) => {
      Object.assign(state, action.payload);
      Storage.setItem(StorageKey.user, state);
    },
    removeUser: (state) => {
      state.accessToken = undefined as any;
      state.user = undefined as any;
      Storage.removeItem(StorageKey.user);
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
