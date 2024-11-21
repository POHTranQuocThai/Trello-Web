
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
//Cấu hình Redux-persist
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' }
          }}>
            <CssBaseline />
            <App />
            <ToastContainer theme="colored" position="bottom-left" />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
