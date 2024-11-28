import { Badge, Box, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
//import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import Profiles from './Menus/Profiles'
import { LibraryAdd } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'


function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        bgcolor: (theme) => (
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
        ),
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to={'/boards'}>
          <Tooltip title="Board List">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>
        <Link to={'/'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
          </Box>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }} variant="outlined" endIcon={<LibraryAdd />}>Create</Button>
        </Box>

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search" label="Search..." type="text" size='small' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{ color: 'white', cursor: 'pointer' }}
                  fontSize='small'
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px', maxWidth: '180px', '& label': { color: 'white' }, '& input': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }} />
        <ModeSelect />
        <Tooltip title='Notification' >
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <CircleNotificationsIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <NotListedLocationIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box >
  )
}

export default AppBar