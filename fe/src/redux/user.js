import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  token: "",
  loginUserPk: "",
  loginUserEmail: "",
  loginUserImg: "",
  loginUserNickname: "",
  selectedBucketlist: {
    pk: "",
    title: "",
    completeRate: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
    appState: "",
    survey: [],
    bucketList: { info: {}, buckets: [] },
    myBucketlist: "",
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: state => {
      state.value = initialStateValue;
      state.appState = "";
      state.survey = [];
      state.bucketList = { info: {}, buckets: [] };
    },
    change: (state, action) => {
      state.value.selectedBucketlist = action.payload;
    },
    profile: (state, action) => {
      state.value.loginUserNickname = action.payload.loginUserNickname;
      state.value.loginUserImg = action.payload.loginUserImg;
    },
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setSurvey: (state, action) => {
      state.survey = action.payload;
    },
    setBucketList: (state, action) => {
      state.bucketList = action.payload;
    },
    reBucketList: (state, action) => {
      state.bucketList.buckets = action.payload;
    },
    changeListInfo: (state, action) => {
      state.bucketList.info = action.payload;
      state.value.selectedBucketlist.title = action.payload.title;
    },
    changeCompleteRate: (state, action) => {
      state.value.selectedBucketlist.completeRate = action.payload;
    },
    changeMyBucketlist: (state, action) => {
      state.myBucketlist = action.payload;
    },
  },
});

export const { changeMyBucketlist, setSurvey, profile, login, logout, change, setAppState, setBucketList, reBucketList, changeListInfo, changeCompleteRate } = userSlice.actions;
export default userSlice.reducer;
