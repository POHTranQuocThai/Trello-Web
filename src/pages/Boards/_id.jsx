import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis/index'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'


function Board() {
  const [board, setBoard] = useState(null)
  const { boardId } = useParams() // Lấy boardId từ URL

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const board = await fetchBoardDetailsAPI(boardId)

        // Nếu có lỗi về kéo thả col rỗng thì bật comment dưới này ko thì thoi
        board.columns.forEach(column => {
          if (isEmpty(column)) {
            const placeholderCard = generatePlaceholderCard(column)
            column.cards = [placeholderCard]
            column.cardOrderIds = [placeholderCard._id]
          }
        })
        setBoard(board)
      } catch (error) {
        console.error('Failed to fetch board details:', error)
      }
    }

    if (boardId) {
      fetchBoardDetails()
    }
  }, [boardId])
  //Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData, // copy lại dữ liệu
      boardId: board._id //gán boardId
    })

    //Khi tạo col mới thì chưa có giá trị , cần xử lý vấn đề kéo thả vào một column rỗng
    const placeholderCard = generatePlaceholderCard(createdColumn)
    createdColumn.cards = [placeholderCard]
    createdColumn.cardOrderIds = [placeholderCard._id]
    //Cập nhật state board
    //Phía FE chúng ta phải tự làm đúng lại state data board (thay vì gọi fetchAPI)
    //Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ board
    // dù đây có là api tạo Col hay card đi chăng nữa
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData, // copy lại dữ liệu
      boardId: board._id //gán boardId
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  //Func này có nhiệm vụ goi API và xử lý khi kéo thả Column xong xuôi
  const moveColumns = async (dndOrderedColumns) => {
    //Update cho chuẩn dữ liệu state board
    const dndOrderColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnsIds
    setBoard(newBoard)

    //Goi API
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderColumnsIds })
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} />
      </Container>
    </>
  )
}

export default Board
