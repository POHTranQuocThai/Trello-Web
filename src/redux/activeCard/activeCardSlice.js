import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}
//Các hành động gọi api (async) và cập nhật dữ liệu trong redux, dùng middleware createAsyncThunk đi kèm với extraReducers

//Khởi tạo một slice trong kho lưu trữ redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
    updateCurrentActiveCard: (state, action) => {
      //Xử lý dữ liệu ở đây
      //Update date again currentActiveCard
      state.currentActiveCard = action.payload
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    }
  },
  //Nơi xử lí đồng bộ
  extraReducers: (builder) => { }
})

export const { updateCurrentActiveCard, clearAndHideCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions
//Selector nó dóng như useSelector() của React
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}
export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}
export const activeCardReducer = activeCardSlice.reducer