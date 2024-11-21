

import { Box, CircularProgress, Typography } from '@mui/material'

function PageLoadingSpinner({ caption }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <CircularProgress />
            <Typography>{caption}</Typography>
        </Box>
    )
}

export default PageLoadingSpinner