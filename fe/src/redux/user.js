import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  token: "",
  loginUserPk: "",
	loginUserEmail: "",
	loginUserImg: "",
  loginUserNickname: "",
	loginBucketNumber: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialStateValue,
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
  },
});

export const { login, logout, change } = userSlice.actions;
export default userSlice.reducer;
