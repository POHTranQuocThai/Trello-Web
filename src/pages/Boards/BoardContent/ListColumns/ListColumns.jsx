import { Box, Button, TextField } from '@mui/material'
import Column from './Column/Column'
import AddchartIcon from '@mui/icons-material/Addchart'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'


function ListColumns({ columns, createNewColumn, createNewCard }) {
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
    await createNewColumn(newColumnData)
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
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard} />)}

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
              <Button variant='contained' color='success' size='small' onClick={addNewColumn}
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
