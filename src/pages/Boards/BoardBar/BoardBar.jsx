import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1975dc'
        ),
        paddingX: 2,
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="Thai Dev"
          clickable />
        <Chip sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable />
        <Chip sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable />
        <Chip sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable />
        <Chip sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            BorderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >Invite</Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
          <Tooltip title='ThaiDev'>
            <Avatar
              alt="ThaiDev"
              src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box >
  )
}

export default BoardBar