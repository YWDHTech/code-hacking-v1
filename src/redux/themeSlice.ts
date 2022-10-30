import { StorageKey, ThemeMode } from "../helpers/type";
import { createSlice } from "@reduxjs/toolkit";
import Storage from "../helpers/Storage";

type ThemeState = {
  mode: ThemeMode;
};

const initialValue: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: () => {
    const theme = Storage.getItem<ThemeState, null>(StorageKey.theme, null);
    if (theme) return theme;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return { mode: "dark" };
    }
    return initialValue;
  },
  reducers: {
    setLightMode: (state) => {
      state.mode = "light";
      Storage.setItem(StorageKey.theme, state);
    },
    setDarkMode: (state) => {
      state.mode = "dark";
      Storage.setItem(StorageKey.theme, state);
    },
  },
});

export const { setLightMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
