
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    column_header_height: COLUMN_HEADER_HEIGHT,
    column_footer_height: COLUMN_FOOTER_HEIGHT
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       // primary: teal,
  //       // secondary: deepOrange
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary: orange
  //     }
  //   }
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        // root: ({ theme }) => ({
        //   color: theme.palette.primary.main,
        fontSize: '0.875rem',
        //   '.MuiOutlinedInput-notchedOutline': {
        //     borderColor: theme.palette.primary.light
        //   },
        //   '&:hover': {
        //     '.MuiOutlinedInput-notchedOutline': {
        //       borderColor: theme.palette.primary.main
        //     }
        //   },
        '& fieldset': {
          borderWidth: '0.5px !important'
        },
        '&:hover fieldset': {
          borderWidth: '1px !important'
        },
        '&.Mui-focused fieldset': {
          borderWidth: '1px !important'
        }
        // })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme
