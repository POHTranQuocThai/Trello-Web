import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
    if (temporaryHideMedia) {
        return (
            <MuiCard
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                    overflow: 'unset'
                }}
            >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>Card 1</Typography>
                </CardContent>
            </MuiCard>
        )
    }
    return (
        <MuiCard
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
            }}
        >
            <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/452599383_1328430465209603_1264279381237542282_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQTSXisp8IQDjSCHP7_MbyJ627nP3owngnrbuc_ejCeFG1xe2YMR13H2oq12CP39wPER9uouV21o9Jwkkpllwp&_nc_ohc=ymrMY-YlrZsQ7kNvgHbPum8&_nc_ht=scontent.fvca1-3.fna&oh=00_AYAd-z1wOGilQQ0aeRyERQrcn_U-ff9uLbyz5t_dgnO4yw&oe=66C0937E"
                title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Thai Dev</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                    20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                    14
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                    5
                </Button>
            </CardActions>
        </MuiCard>
    )
}

export default Card