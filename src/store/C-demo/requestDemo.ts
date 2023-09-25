import { getHomeInfoData } from '@/api/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
export interface IHomeInfo {
  banners?: any[];
  categorys?: any[];
  recommends?: any[];
  digitalData?: any;
}
interface IInitialState {
  requestDemoInfo: IHomeInfo;
}
const requestSlice = createSlice({
  name: 'requestDemo',
  initialState: {
    requestDemoInfo: {}
  } as IInitialState,
  reducers: {
    // 默认参数就有类型提示了
    changeNavbarAction(state, action) {
      state.requestDemoInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.requestDemo // hydration home模块数据
      };
    });
  }
});
// 异步的action
export const fetchHomeInfoAction = createAsyncThunk(
  'fetchHomeInfoAction',
  async (payload: number, { dispatch }) => {
    // console.log("payload=>", payload);
    const res = await getHomeInfoData();
    dispatch(requestSlice.actions.changeNavbarAction(res.data));
  }
);

export const { changeNavbarAction } = requestSlice.actions;
export default requestSlice.reducer;
