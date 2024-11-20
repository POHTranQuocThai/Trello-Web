import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'


const initialState = {
    currentActiveBoard: null
}
//Các hành động gọi api (async) và cập nhật dữ liệu trong redux, dùng middleware createAsyncThunk đi kèm với extraReducers

export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        // axios sẽ trả về kết quả thông qua property của nó là data
        return response.data // Sửa lại ở đây, chỉ cần `response.data`
    }
)
//Khởi tạo một slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            //Xử lý dữ liệu ở đây
            //Update date again currentActiveBoard
            state.currentActiveBoard = action.payload
        }
    },
    //Nơi xử lí đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            //action.payload ở đây là cái response trả về ở trên
            let board = action.payload

            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })
            //Update date again currentActiveBoard
            state.currentActiveBoard = board
        })
    }
})

export const { updateCurrentActiveBoard } = activeBoardSlice.actions
//Selector nó dóng như useSelector() của React
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}
export const activeBoardReducer = activeBoardSlice.reducer