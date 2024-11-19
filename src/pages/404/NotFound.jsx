import { Box, Typography, Button, SvgIcon } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'
import astronautSvg from '~/assets/404/astronaut.svg'
import planetSvg from '~/assets/404/planet.svg'

function NotFound() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#25344C',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          '@keyframes stars': {
            '0%': { backgroundPosition: '-100% 100%' },
            '100%': { backgroundPosition: '0 0' }
          },
          animation: 'stars 12s linear infinite alternate',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/src/assets/404/particles.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '100px', fontWeight: 800 }}>
          404
        </Typography>

        <Typography
          sx={{
            fontSize: '18px !important',
            lineHeight: '25px',
            fontWeight: 400,
            maxWidth: '350px',
            textAlign: 'center'
          }}
        >
          LOST IN{' '}
          <Box
            component="span"
            sx={{
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '""',
                borderBottom: '3px solid #fdba26',
                left: 0,
                top: '43%',
                width: '100%'
              }
            }}
          >
            {' '}SPACE{' '}
          </Box>
          {' '}
          <Box component="span" sx={{ color: '#fdba26', fontWeight: 500 }}>
            TrungQuanDev
          </Box>
          ?<br />
          Hmm, looks like that page doesn&apos;t exist.
        </Typography>

        <Box sx={{ width: '390px', height: '390px', position: 'relative' }}>
          <Box
            component="img"
            src={astronautSvg}
            sx={{
              width: '50px',
              height: '50px',
              position: 'absolute',
              top: '20px',
              right: '25px',
              '@keyframes spinAround': {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' }
              },
              animation: 'spinAround 5s linear infinite'
            }}
          />
          <Box
            component="img"
            src={planetSvg}
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                color: '#fdba26',
                borderColor: '#fdba26'
              }
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NotFound