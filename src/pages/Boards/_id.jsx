import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI } from '~/apis/index'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //Tạm thời fix cứng id (nâng cao sẽ dùng react-router0dom để lấy chuẩn boardId từ URL về)
    //Call API
    const boardId = '66c48c6d6eb222d663158e8f'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  //Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData, // copy lại dữ liệu
      boardId: board._id //gán boardId
    })
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData, // copy lại dữ liệu
      boardId: board._id //gán boardId
    })
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
      </Container>
    </>
  )
}

export default Board
