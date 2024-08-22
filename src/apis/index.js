import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // axios sẽ trả về kết quả thông qua property của nó là data
  return response.data // Sửa lại ở đây, chỉ cần `response.data`
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
