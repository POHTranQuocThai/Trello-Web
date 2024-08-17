import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt eventt, fix trường hợp click bị gọi eventt
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event)
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { deley: 250, tolerance: 500 } })

  //ưu tiên sử dụng mouse and touch
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState(prevColumns => {
      //Tìm vị trí index của cái overCard trong column đích (nơi card sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      //Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - update
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //nextActiveColumn column cũ
      if (nextActiveColumn) {
        //Xóa card ở cái column active 
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //Cập nhật lại dữ liệu cho mảng cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        //Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa nếu có thì xóa
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        //Cập nhật lại dữ liệu cho mảng cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])
  //Tìm một cái column theo cardID
  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    //Nếu là kéo card thì mới set dữ liệu oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  const handleDragOver = (event) => {
    //Không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    const { active, over } = event
    //Cần đảm bảo nếu không tồn tại active hoặc over thì không làm gì
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    //Xử lý kéo thẻ card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)
      } else {
        //Hành động kéo thả card trong cùng một cái column

        //Lấy vị trí cũ
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //Lấy vị trí mới
        const newCardIndex = overColumn?.cards?.findIndex(column => column._id === overCardId)
        //Dùng arrayMove vì kéo card trong một cái column thì tương tự với logic kéo column trong một cái board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnsState(prevColumns => {
          //Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - update
          const nextColumns = cloneDeep(prevColumns)

          //Tìm tới cái column mà chúng ta đang thả
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          //Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái tảgetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          //Trả về giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    //Xử lí kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //lay vitri cu
        const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        //lay vitri moi
        const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
        //col sau khi keo tha
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
        //const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumnsState(dndOrderedColumns)
      }
    }
    //Những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị null sau khi DragEnd
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  //Animation khi thả phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần tử chổ Overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}
      onDragStart={handleDragStart} onDragOver={handleDragOver}
      collisionDetection={closestCorners}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumnsState} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box >
    </DndContext>
  )
}

export default BoardContent