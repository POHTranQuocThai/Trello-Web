import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event)
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { deley: 250, tolerance: 500 } })

  //ưu tiên sử dụng mouse and touch
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])
  const handleDragEnd = (even) => {
    const { active, over } = even
    if (!over) return
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

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box >
    </DndContext>
  )
}

export default BoardContent