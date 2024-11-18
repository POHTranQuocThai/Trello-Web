import { Box, CircularProgress, Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColumnAPI, deleteColumnDetailsAPI, fetchBoardDetailsAPI, moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis/index'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep, isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  useEffect(() => {
    //Tạm thời fix cứng id (nâng cao sẽ dùng react-router-dom để lấy chuẩn boardId từ URL về)
    //Call API
    const boardId = '66c48c6d6eb222d663158e8f'
    dispatch(fetchBoardDetailsAPI(boardId))


  }, [dispatch])
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
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData, // copy lại dữ liệu
      boardId: board._id //gán boardId
    })

    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      //Nếu col rỗng : bản chất là đang chứa placeholder-card
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  //Func này có nhiệm vụ goi API và xử lý khi kéo thả Column xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    //Update cho chuẩn dữ liệu state board
    const dndOrderColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnsIds
    setBoard(newBoard)

    //Goi API
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderColumnsIds })
  }

  /**
   * Khi di chuyển card trong cùng column
   * Chỉ cần gọi API để cập nhật mảng cardOrderIds của Col chứa nó
   */
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //Update cho chuẩn dữ liệu state board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    //Goi API
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  /**
   * Khi di chuyển card sang column khác
   * B1: Cập nhật mảng cardOrderIds của coloumn ban đầu chứa nó
   * B2: Cập nhật mảng cardOrderIds của column tiếp theo 
   * B3: Cập nhật lại trường columnId mới của card đã kéo
   * => Làm một API support riêng
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    //Update cho chuẩn dữ liệu state board
    const dndOrderColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))
    //Gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  //Xử lý xóa một col và cards bên trong nó
  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    dispatch(updateCurrentActiveBoard(newBoard))
    //Goi API
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent moveCardInTheSameColumn={moveCardInTheSameColumn} moveCardToDifferentColumn={moveCardToDifferentColumn}
          board={board} createNewColumn={createNewColumn} createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails} moveColumns={moveColumns} />
      </Container>
    </>
  )
}

export default Board
