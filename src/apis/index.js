import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   // axios sẽ trả về kết quả thông qua property của nó là data
//   return response.data // Sửa lại ở đây, chỉ cần `response.data`
// }
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  // axios sẽ trả về kết quả thông qua property của nó là data
  return response.data // Sửa lại ở đây, chỉ cần `response.data`
}
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  // axios sẽ trả về kết quả thông qua property của nó là data
  return response.data // Sửa lại ở đây, chỉ cần `response.data`
}
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  // axios sẽ trả về kết quả thông qua property của nó là data
  return response.data
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // axios sẽ trả về kết quả thông qua property của nó là data
  return response.data // Sửa lại ở đây, chỉ cần `response.data`
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
