import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import AddchartIcon from '@mui/icons-material/Addchart'


function ListColumns({ columns }) {

  return (
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
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d',
        mx: 2
      }}>
        <Button
          startIcon={<AddchartIcon />}
          sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
        >Add New Column</Button>
      </Box>
    </Box>
  )
}

export default ListColumns
