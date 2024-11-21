import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'


const initialState = {
    currentUser: null
}
//Các hành động gọi api (async) và cập nhật dữ liệu trong redux, dùng middleware createAsyncThunk đi kèm với extraReducers

export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
        // axios sẽ trả về kết quả thông qua property của nó là data
        return response.data // Sửa lại ở đây, chỉ cần `response.data`
    }
)
//Khởi tạo một slice trong kho lưu trữ redux store
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    //Nơi xử lí đồng bộ
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
    }
})

//export const { } = userSlice.actions
//Selector nó dóng như useSelector() của React
export const selectCurrentUser = (state) => {
    return state.user.currentUser
}
export const userReducer = userSlice.reducer