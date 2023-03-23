import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  token: "",
  loginUserPk: "",
	loginUserEmail: "",
	loginUserImg: "",
  loginUserNickname: "",
	loginBucketName: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialStateValue,
    appState : "",
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: state => {
      state.value = initialStateValue;
    },
		change: (state, action) => {
      state.value.loginBucketName = action.payload;
    },
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { login, logout, change, setAppState } = userSlice.actions;
export default userSlice.reducer;
