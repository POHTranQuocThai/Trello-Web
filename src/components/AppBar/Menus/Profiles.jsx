import { Logout, PersonAdd, Settings } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import React from 'react'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="ThaiDev"
            src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
      >
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
