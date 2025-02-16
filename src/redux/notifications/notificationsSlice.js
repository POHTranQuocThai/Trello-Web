import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


const initialState = {
  currentNotifications: null
}
//Các hành động gọi api (async) và cập nhật dữ liệu trong redux, dùng middleware createAsyncThunk đi kèm với extraReducers

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    // axios sẽ trả về kết quả thông qua property của nó là data
    return response.data // Sửa lại ở đây, chỉ cần `response.data`
  }
)
export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)
//Khởi tạo một slice trong kho lưu trữ redux store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateCurrentNotifications: (state, action) => {
      //Xử lý dữ liệu ở đây
      //Update date again currentnotifications
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      //add phần tử vào đầu mảng unshift, ngc lại vs push
      state.currentNotifications.unshift(action.payload)
    },
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    }
  },
  //Nơi xử lí đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      //Đoạn này đảo ngc mảng invitations nhận được đơn giản là để hiển thị cái mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      //Cập nhật lại dữ liệu boardInvitation (bên trong nó sẽ có status mới sau khi update)
      const getInvitation = state.currentNotifications.find(i => i._id === action.payload._id)
      getInvitation.boardInvitation = action.payload.boardInvitation
    })
  }
})

export const { updateCurrentnotifications, clearCurrentNotifications, addNotification } = notificationsSlice.actions
//Selector nó dóng như useSelector() của React
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}
export const notificationsReducer = notificationsSlice.reducer