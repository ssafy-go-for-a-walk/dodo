import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  token: "",
  loginUserPk: "",
	loginUserEmail: "",
	loginUserImg: "",
  loginUserNickname: "",
	loginBucketNumber: "",
};

const initialStateValue2 = {
  appState: ""
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialStateValue,
    appState : initialStateValue2,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: state => {
      state.value = initialStateValue;
    },
		change: (state, action) => {
      state.value.loginBucketNumber = action.payload.bucketNumber;
    },
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { login, logout, change, setAppState } = userSlice.actions;
export default userSlice.reducer;
