import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

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
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} />
      </Container>
    </>
  )
}

export default Board
