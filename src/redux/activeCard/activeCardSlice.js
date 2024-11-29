import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'


const initialState = {
    currentActiveCard: null
}
//Các hành động gọi api (async) và cập nhật dữ liệu trong redux, dùng middleware createAsyncThunk đi kèm với extraReducers

//Khởi tạo một slice trong kho lưu trữ redux store
export const activeCardSlice = createSlice({
    name: 'activeCard',
    initialState,
    reducers: {
        updateCurrentActiveCard: (state, action) => {
            //Xử lý dữ liệu ở đây
            //Update date again currentActiveCard
            state.currentActiveCard = action.payload
        },
        clearCurrentActiveCard: (state, action) => {
            state.currentActiveCard = null
        }
    },
    //Nơi xử lí đồng bộ
    extraReducers: (builder) => { }
})

export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions
//Selector nó dóng như useSelector() của React
export const selectCurrentActiveCard = (state) => {
    return state.activeCard.currentActiveCard
}
export const activeCardReducer = activeCardSlice.reducer