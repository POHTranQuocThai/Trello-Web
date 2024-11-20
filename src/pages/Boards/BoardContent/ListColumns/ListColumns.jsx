import { Box, Button, TextField } from '@mui/material'
import Column from './Column/Column'
import AddchartIcon from '@mui/icons-material/Addchart'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { createNewColumnAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


function ListColumns({ columns }) {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column title!')
      return
    }
    //Tạo dữ liệu column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }
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
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map(column => <Column key={column._id} column={column} />)}

        {/* Box Add New Column */}
        {!openNewColumnForm ?
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              mx: 2
            }}>
            <Button
              startIcon={<AddchartIcon />}
              sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
            >Add New Column</Button>
          </Box> : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            color: 'white'
          }
          }><TextField
              label="Enter column title..." type="text" size='small' autoFocus variant='outlined' value={newColumnTitle}
              onChange={e => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant='contained' color='success' size='small' onClick={addNewColumn} className='interceptor-loading'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}>
                Add column</Button>
              <CloseIcon
                sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.main } }}
                fontSize='small'
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns
